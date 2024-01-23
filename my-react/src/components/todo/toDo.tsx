import React, { useEffect, useRef, useState } from "react";
import { ToDo } from "../../types/toDoType";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, ToggleButton, TextField, styled } from "@mui/material";
import CustomAlert from "../cutomeAlert";
import * as api from "../../app/api";
import styles from "./todo.module.css";

enum RequestState {
  Idle,
  Loading,
  Error,
  Success,
}

interface props {
  toDo: ToDo;
  userId: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, newDesc: string) => void;
  onToggle: (id: string) => void;
}

const ToDoComponent = ({ toDo, userId, onDelete, onEdit, onToggle }: props) => {
  const [isEditing, setEditing] = useState(false);
  const [editedToDo, setEditedToDo] = useState<ToDo>({ ...toDo });
  const [editedDesc, setEditedDesc] = useState(toDo.desc);
  const [requestState, setRequestState] = useState(RequestState.Idle);
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        handleSaveCancellation();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    setEditing(true);
    setRequestState(RequestState.Idle);
  };

  const resetState = () => {
    setRequestState(RequestState.Idle);
  };

  const handleDeleteClick = async () => {
    try {
      setRequestState(RequestState.Loading);
      await api.deleteUserToDo(userId, editedToDo.id);
      onDelete(editedToDo.id);
      setRequestState(RequestState.Success);
    } catch (error) {
      setRequestState(RequestState.Error);
    } finally {
      setEditing(false);
    }
  };
  const handleSaveCancellation = () => {
    setEditing(false);
    setEditedDesc(toDo.desc);
  };

  const handleSave = async () => {
    try {
      if (editedDesc.trim() === "") throw new Error("הכנס תיאור");
      setRequestState(RequestState.Loading);
      await api.updateUserToDo(userId, editedToDo.id, editedDesc);
      onEdit(editedToDo.id, editedDesc);
      setEditedToDo((prevToDo) => ({
        ...prevToDo,
        desc: editedDesc,
      }));
      setRequestState(RequestState.Success);
    } catch (error) {
      setRequestState(RequestState.Error);
      handleSaveCancellation();
    } finally {
      setEditing(false);
    }
  };

  const handleToggle = async () => {
    try {
      setRequestState(RequestState.Loading);
      await api.toggleUserToDo(userId, editedToDo.id);
      onToggle(editedToDo.id);
      setEditedToDo((prevToDo) => ({
        ...prevToDo,
        finished: !prevToDo.finished,
      }));
      setRequestState(RequestState.Success);
    } catch (error) {
      setRequestState(RequestState.Error);
    } finally {
      setEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDesc(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <Box ref={componentRef} className={styles.todoBox}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {isEditing ? (
          <>
            <CheckIcon onClick={handleSave}>שמור</CheckIcon>
            <CloseIcon onClick={handleSaveCancellation}>בטל</CloseIcon>
          </>
        ) : (
          <>
            <EditIcon onClick={handleEditClick}>ערוך</EditIcon>
            <DeleteIcon onClick={handleDeleteClick}>מחק</DeleteIcon>
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <ToggleButton
          value="check"
          selected={editedToDo.finished}
          onClick={handleToggle}
          className={styles.toggleButton}
        >
          {editedToDo.finished ? <CheckIcon /> : ""}
        </ToggleButton>
        {isEditing ? (
          <TextField
            value={editedDesc}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={requestState === RequestState.Loading}
            sx={{ width: "82px" }}
          />
        ) : (
          <Box className={styles.todoDesc}>{editedDesc}</Box>
        )}
      </Box>
      <CustomAlert
        severity={
          requestState === RequestState.Loading
            ? "info"
            : requestState === RequestState.Error
            ? "error"
            : "success"
        }
        message={
          requestState === RequestState.Loading
            ? "שומר שינויים"
            : requestState === RequestState.Error
            ? "השמירה נכשלה, נסה שוב"
            : "המשימה עודכנה בהצלחה"
        }
        autoHideDuration={
          requestState === RequestState.Success ||
          requestState === RequestState.Error
            ? 3000
            : undefined
        }
        show={
          requestState === RequestState.Loading ||
          requestState === RequestState.Success ||
          requestState === RequestState.Error
        }
        onClose={resetState}
      />
    </Box>
  );
};

export default ToDoComponent;
