import axios from "axios";

const BASE_URL =
  "https://my-todo-app-283967249469.asia-south1.run.app/api/todos/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ToDo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
}

export interface ToDoCreate {
  title: string;
  description?: string;
  completed?: boolean;
}

export const fetchAllToDos = async (): Promise<ToDo[]> => {
  const response = await api.get<ToDo[]>("/");
  return response.data;
};

export const fetchToDoById = async (id: number): Promise<ToDo> => {
  const response = await api.get<ToDo>(`/${id}/`);
  return response.data;
};

export const createToDo = async (data: ToDoCreate): Promise<ToDo> => {
  const response = await api.post<ToDo>("/", data);
  return response.data;
};

export const toggleToDoCompletion = async (
  id: number,
  completed: boolean
): Promise<ToDo> => {
  const response = await api.put<ToDo>(`/${id}/`, { completed });
  return response.data;
};

export const deleteToDoById = async (id: number): Promise<void> => {
  await api.delete(`/${id}/`);
};

export const deleteAllToDos = async (): Promise<void> => {
  await api.delete("/");
};
