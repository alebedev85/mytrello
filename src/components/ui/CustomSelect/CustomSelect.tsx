import { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.scss";
import { PRIORITY_COLORS } from "../../../utils/constants";
import { Priority } from "../../../types";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "none", label: "Без приоритета" },
  { value: "high", label: "Высокий" },
  { value: "medium", label: "Средний" },
  { value: "low", label: "Низкий" },
];

interface CustomSelectProps {
  selected: Priority;
  onSelect: (value: Priority) => void;
}

export default function CustomSelect({
  selected,
  onSelect,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Закрытие селектора по клику вне
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={selectRef}
      className={`${styles.selectWrapper} ${isOpen ? styles.open : ""}`}
    >
      <div
        className={styles.selected}
        style={{ backgroundColor: PRIORITY_COLORS[selected] || "#fff" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((opt) => opt.value === selected)?.label ||
          "Выберите приоритет"}
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.option}
              style={{
                backgroundColor: PRIORITY_COLORS[option.value as Priority],
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              onClick={() => {
                onSelect(option.value as Priority);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
