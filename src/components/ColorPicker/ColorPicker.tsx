import { COLUMN_COLORS as colors } from "../../utils/constants";
import styles from "./ColorPicker.module.scss";

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorPicker = ({ selectedColor, onSelectColor }: ColorPickerProps) => {
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
