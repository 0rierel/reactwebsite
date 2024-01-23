import styles from "./navbar.module.css";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface props {
  userName: string;
  logoutHandler: () => void;
}

const ButtonAppBar = ({ userName, logoutHandler }: props) => {
  const isDarkMode = useSelector((state: RootState) => state.darkMode.value);

  const logoutBubbler = () => {
    logoutHandler();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: isDarkMode ? "#333" : "#fff" }}
      >
        <Toolbar>
          <Typography component="div" className={styles.title}>
            המשימות שלי
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: isDarkMode ? "#fff" : "#000", marginLeft: 1 }}
          >
            שלום, {userName}!
          </Typography>
          <Link to="/">
            <Button
              sx={{
                color: isDarkMode ? "#000" : "#fff",
                backgroundColor: isDarkMode ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#ccc" : "#333",
                },
              }}
              onClick={logoutBubbler}
            >
              התנתק
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
