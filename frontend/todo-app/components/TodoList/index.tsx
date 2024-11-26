"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { TodoListScroll } from "./TodoListScroll";
import {
  fetchAllToDos,
  createToDo,
  deleteToDoById,
  toggleToDoCompletion,
  deleteAllToDos,
} from "../../lib/api";
import { useState } from "react";

export const TodoList = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchAllToDos,
  });

  const { mutate: addTodo } = useMutation({
    mutationFn: createToDo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"] as any);
      setNewTodoTitle("");
    },
    onError: (error: Error) => {
      console.error("Error creating todo:", error.message);
    },
  });

  const { mutate: clearAllTodos } = useMutation({
    mutationFn: deleteAllToDos,
    onMutate: async () => {
      await queryClient.cancelQueries(["todos"] as any);

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], []);

      return { previousTodos };
    },
    onError: (err: Error, _, context: any) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
      console.error("Error clearing all todos:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"] as any);
    },
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: deleteToDoById,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries(["todos"] as any);

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old: any) =>
        old.filter((todo: any) => todo.id !== id)
      );

      return { previousTodos };
    },
    onError: (err: Error, id: number, context: any) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
      console.error("Error deleting todo:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"] as any);
    },
  });

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  const handleToggle = (id: number, completed: boolean) => {
    console.log("Toggling todo", id, completed);
    toggleToDoCompletion(id, !completed)
      .then(() => {
        queryClient.invalidateQueries(["todos"] as any);
      })
      .catch((error) => {
        console.error("Error toggling todo:", error);
      });
  };

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      addTodo({
        title: newTodoTitle,
        completed: false,
      });
    }
  };

  const handleClearAll = () => {
    clearAllTodos();
  };

  return (
    <div className="bg-white w-1/4 rounded-md h-1/2 p-4 relative">
      <div className="text-xl font-bold">Todo App</div>
      <div className="mt-4 flex">
        <Input
          type="text"
          placeholder="Add a new todo"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <Button
          className="bg-purple-500 text-white p-2 rounded-md ml-2"
          onClick={handleAddTodo}
        >
          <Plus width="30" height="30" />
        </Button>
      </div>

      <TodoListScroll
        todos={todos || []}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        isLoading={isLoading}
        isError={isError}
        error={error as Error}
      />

      <div className="flex items-center absolute bottom-2 left-2 right-2 justify-between mt-2">
        <p>
          You have {todos?.filter((todo) => !todo.completed).length} pending
          tasks
        </p>
        <Button
          className="bg-purple-500 text-white p-2 rounded-md w-20 h-8"
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};