import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Loader = () => {
  const { theme } = useSelector((state: RootState) => state.board);

  return (
    <div className={`loader ${theme === "dark" ? "dark" : "light"}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;