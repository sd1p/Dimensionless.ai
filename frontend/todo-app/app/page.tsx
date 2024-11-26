import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <TodoList />
    </div>
  );
}
