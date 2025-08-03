'use client';

import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-600 tracking-tight drop-shadow-sm">
        📝 Min Todo-Lista
      </h1>
      <TodoList />
    </main>
  );
}