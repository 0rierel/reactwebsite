import styles from "./ToDoForm.module.css";
import { InputAdornment, TextField, Box } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState, ElementType } from "react";

interface Props {
  onSearch?: (term: string) => void;
  onSubmit?: (term: string) => void;
  icon: ElementType;
  promptText: string;
}

const ToDoForm = ({ onSearch, onSubmit, icon, promptText }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleIconClick = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
    if (onSubmit) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  const handleFormSubmitted = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleFormSubmitted}>
      <Box className={styles.formContainer}>
        <TextField
          id="outlined-search"
          label={promptText}
          type="search"
          value={inputValue}
          onChange={handleInputChanged}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={handleIconClick}
                style={{ cursor: "pointer" }}
              >
                {React.createElement(icon)}
              </InputAdornment>
            ),
          }}
          className={styles.inputField}
        />
      </Box>
    </form>
  );
};

export default ToDoForm;
