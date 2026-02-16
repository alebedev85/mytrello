import { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.scss";
import { PRIORITY_COLORS } from "../../../utils/constants";
import { Priority } from "../../../types";

interface CustomSelectProps {
  value: Priority;
  onChange: (value: Priority) => void;
}

const options = [
  { value: "none", label: "Без приоритета" },
  { value: "high", label: "Высокий" },
  { value: "medium", label: "Средний" },
  { value: "low", label: "Низкий" },
];

const CustomSelect = ({ value, onChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={selectRef}
      className={`${styles.selectWrapper} ${isOpen ? styles.open : ""}`}
    >
      <div
        className={styles.selected}
        style={{ background: PRIORITY_COLORS[value] || "#fff" }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {options.find((opt) => opt.value === value)?.label ||
          "Выберите приоритет"}
      </div>

      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.option}
              style={{
                background:
                  PRIORITY_COLORS[option.value as Priority],
              }}
              onClick={() => {
                onChange(option.value as Priority);
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
};

export default CustomSelect;