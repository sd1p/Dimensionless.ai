import { Trash } from "lucide-react";

interface TodoProps {
  id: number;
  title: string;
  status: boolean;
  handleDelete: (id: number) => void;
  handleToggle: (id: number, completed: boolean) => void;
}

export const Todo = ({
  id,
  title,
  status,
  handleDelete,
  handleToggle,
}: TodoProps) => {
  return (
    <div className="flex my-2 p-2 bg-slate-100 items-center rounded-sm justify-between">
      <div className="flex flex-row">
        <input
          type="checkbox"
          checked={status}
          onChange={() => handleToggle(id, status)}
          className="mr-4"
        />
        <div>{title}</div>
      </div>
      <button
        onClick={() => handleDelete(id)}
        className="hover:bg-red-500 h-8 w-8 flex items-center justify-center rounded-md"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  );
};
