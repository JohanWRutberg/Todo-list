'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus } from "lucide-react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6 border border-indigo-100">
      <div className="flex items-center gap-3">
        <input
          type="text"
          className="flex-grow p-4 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-lg"
          placeholder="Vad behöver du göra?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          className="bg-indigo-500 text-white rounded-xl p-4 hover:bg-indigo-600 transition-all shadow-md"
        >
          <Plus size={20} />
        </button>
      </div>
      <ul className="space-y-4">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 30 }}
              layout
              className="bg-indigo-50 p-4 rounded-xl flex justify-between items-center shadow border border-indigo-100 hover:bg-indigo-100 transition"
            >
              <span className="text-gray-800 text-base font-medium">{todo.text}</span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={18} />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}