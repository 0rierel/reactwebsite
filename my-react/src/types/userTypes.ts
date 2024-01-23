
import { ToDo } from "./toDoType";
  
  interface User {
    name: string;
    id: string;
    toDos: ToDo[];
  }
  
  export type { User };
  