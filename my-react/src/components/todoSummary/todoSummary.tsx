import React from "react";
import styles from "./todoSummary.module.css";
import {ToDo} from "../../types/toDoType";

interface props {
  toDos: ToDo[];
}

const TodoSummary: React.FC<props> = ({ toDos }: props) => {
  const completedTodos = toDos.filter(
    (toDo) => toDo.finished
  ).length;
  const totalTodos = toDos.length;
  const remainingTodos = totalTodos - completedTodos;

  return (
    <h1 className={styles.todoSummaryHeadline}>
      הושלמו: {completedTodos} משימות מתוך: {totalTodos} נותרו: {remainingTodos}
    </h1>
  );
};

export default TodoSummary;
