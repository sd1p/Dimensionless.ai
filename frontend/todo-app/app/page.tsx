import { TodoList } from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <TodoList />
    </div>
  );
}
