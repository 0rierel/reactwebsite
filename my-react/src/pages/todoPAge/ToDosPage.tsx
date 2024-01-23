import {
  setUserId as setUserIdInStore,
  setUserName as setUserNameInStore,
} from "../../features/user/userSlice";
import Box from "@mui/material/Box";
import styles from "./todoPage.module.css";
import { useState, useEffect } from "react";
import { RootState } from "../../app/store";
import { ToDo } from "../../types/toDoType";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ToDoBox from "../../components/todo/toDo";
import Navbar from "../../components/navbar/navbar";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import ToDoForm from "../../components/todoForm/toDoForm";
import TodoSummary from "../../components/todoSummary/todoSummary";
import { createUserToDo, getToDoListByUserId } from "../../app/api";
import DarkModeButton from "../../components/darkMode/darkModeButton";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const filterToDos = (toDos: ToDo[], searchTerm: string) => {
  if (searchTerm.trim() === "") {
    return toDos;
  } else {
    return toDos.filter((toDo) => toDo.desc.includes(searchTerm.trim()));
  }
};

const ToDosPage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [todoList, setTodoList] = useState<ToDo[]>([]);
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const navigate = useNavigate();

  useEffect(() => {
    getToDoList();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const getUserDetails = () => {
    const userId =
      useSelector((state: RootState) => state.user.userId) ??
      localStorage.getItem("userId");
    const userName =
      useSelector((state: RootState) => state.user.userName) ??
      localStorage.getItem("userName");
    return { userId, userName };
  };
  const { userId, userName } = getUserDetails();

  const getToDoList = async () => {
    try {
      setTodoList(await getToDoListByUserId(userId as string));
    } catch (error: any) {
      if (error.response.status === 404) navigate("/");
    }
  };

  const handleNewToDoSubmit = async (desc: string) => {
    try {
      if (desc.trim() === "") throw new Error("הכנס תיאור");
      await createUserToDo(userId as string, desc);
      setTodoList(await getToDoListByUserId(userId as string));
    } catch (error) {
      console.error("Error creating ToDo:", error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    dispatch(setUserNameInStore(null));
    dispatch(setUserIdInStore(null));
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const forms = [
    { onSearch: handleSearch, icon: SearchIcon, promptText: "חיפוש משימה" },
    { onSubmit: handleNewToDoSubmit, icon: AddIcon, promptText: "הוספת משימה" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        {userName && (
          <Navbar userName={userName} logoutHandler={logoutHandler}></Navbar>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          {forms.map((form, index) => (
            <ToDoForm key={index} {...form}></ToDoForm>
          ))}
        </Box>
        <Box className={styles.todoBox}>
          {filterToDos(todoList, searchTerm).map((toDo: ToDo) => (
            <ToDoBox
              onToggle={(id) => {
                setTodoList((prevTodos) =>
                  prevTodos.map((todo) =>
                    todo.id === id
                      ? { ...todo, finished: !todo.finished }
                      : todo
                  )
                );
              }}
              onEdit={(id, newDesc) =>
                setTodoList((prevTodos) =>
                  prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, desc: newDesc } : todo
                  )
                )
              }
              onDelete={(id) => {
                setTodoList((prevTodos) =>
                  prevTodos.filter((todo) => todo.id !== id)
                );
              }}
              key={toDo.id}
              toDo={toDo}
              userId={userId as string}
            />
          ))}
        </Box>
        <TodoSummary toDos={todoList} />
        <DarkModeButton></DarkModeButton>
      </Box>
    </ThemeProvider>
  );
};

export default ToDosPage;
