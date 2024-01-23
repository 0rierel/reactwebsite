import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserName } from "../../features/user/userSlice";
import { User } from "../../types/userTypes";
import { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Typography,
  Box,
} from "@mui/material";
import { RootState } from "../../app/store";
import DarkModeButton from "../../components/darkMode/darkModeButton";
import DropDownMenu from "../../components/dropDowmMenu/dropDownMenu";
import * as api from "../../app/api";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await api.getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (user: User | null) => {
    if (user) {
      dispatch(setUserId(user.id));
      dispatch(setUserName(user.name));
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      setSelectedUser(user);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selectedUser) {
      navigate("/ToDos");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box onKeyDown={handleKeyPress} className={styles.homePage}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "220px",
            marginBottom: "16px",
          }}
        >
          המשימות שלי
        </Typography>
        {users && (
          <DropDownMenu
            sx={{ width: "230px" }}
            objArr={users}
            onSelectChange={handleUserChange}
            labelText="בחר משתמש להתחברות.."
            idKey="id"
            displayKey="name"
          />
        )}

        <Link to={selectedUser ? "/ToDos" : "#"}>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedUser}
            sx={{
              marginTop: "16px",
            }}
          >
            התחבר
          </Button>
        </Link>
        <DarkModeButton></DarkModeButton>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
