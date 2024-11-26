import { Todo } from "../Todo";
import { ScrollArea } from "../ui/scroll-area";

interface TodoListScrollProps {
  todos: Array<{ id: number; title: string; completed: boolean }>;
  handleDelete: (id: number) => void;
  handleToggle: (id: number, completed: boolean) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const TodoListScroll: React.FC<TodoListScrollProps> = ({
  todos,
  handleDelete,
  handleToggle,
  isLoading,
  isError,
  error,
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <ScrollArea className="mt-4 h-52">
      {todos?.map((todo) => (
        <Todo
          id={todo.id}
          key={todo.id}
          title={todo.title}
          status={todo.completed}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
        />
      ))}
    </ScrollArea>
  );
};
