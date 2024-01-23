import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { toggleDarkMode } from "../../features/darkMode/darkModeSlice";
import styles from "./darkModeButton.module.css"

const DarkModeButton = () => {
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <IconButton
      onClick={handleToggleDarkMode}
      color="inherit"
      className={styles.button}
         >
      <Brightness4Icon />
    </IconButton>
  );
};

export default DarkModeButton;
