import React from "react";
import styles from "./ColorPicker.module.scss";

const colors = [
  "", // Сброс цвета
  "#3b82f6", // Синий
  "#ef4444", // Красный
  "#10b981", // Зеленый
  "#f59e0b", // Оранжевый
  "#8b5cf6", // Фиолетовый
  "#f472b6", // Розовый
  "#6b7280", // Серый
];

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className={styles.colorPicker}>
      {colors.map((color) => (
        <button
          key={color}
          className={`${styles.colorButton} ${
            selectedColor === color ? styles.active : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
