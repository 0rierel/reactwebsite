import axios from "axios";

export const API_BASE_URL = "http://localhost:8080/users";

export const getToDoListByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}/ToDos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUserToDo = async (userId: string, desc: string) => {
  try {
    await axios.post(`${API_BASE_URL}/${userId}/ToDos`, { desc });
  } catch (error) {
    console.error("Error creating ToDo:", error);
    throw error;
  }
};

export const deleteUserToDo = async (userId: string, toDoId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/${userId}/ToDos/${toDoId}`);
  } catch (error) {
    console.error("Error deleting ToDo:", error);
    throw error;
  }
};

export const updateUserToDo = async (
  userId: string,
  toDoId: string,
  newDesc: string
) => {
  try {
    await axios.patch(
      `${API_BASE_URL}/${userId}/ToDos/${toDoId}?newDesc=${newDesc}`
    );
  } catch (error) {
    console.error("Error updating ToDo:", error);
    throw error;
  }
};

export const toggleUserToDo = async (userId: string, toDoId: string) => {
  try {
    await axios.patch(`${API_BASE_URL}/${userId}/ToDos/${toDoId}/toggle`);
  } catch (error) {
    console.error("Error toggling ToDo:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
