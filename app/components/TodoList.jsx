'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";   // Animering av element som läggs till eller tas bort
import { Trash2, Plus } from "lucide-react";               // Ikoner från Lucide: en papperskorg och ett plustecken

// Själva TodoList-komponenten
export default function TodoList() {
  
  const [todos, setTodos] = useState([]);                             // todos = array med alla todo-objekt
  const [input, setInput] = useState("");                             // input = texten i inmatningsfältet

  // 🔁 Ladda todos från localStorage när komponenten mountas
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored)); // Konvertera från sträng till array
    }
  }, []);

  // 💾 Spara todos till localStorage varje gång de ändras
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // Gör om array till sträng
  }, [todos]);

  // Funktion som lägger till en todo i listan
  const addTodo = () => {
    if (input.trim() === "") return;                                  // Tom sträng? Avbryt.
    setTodos([...todos, { id: Date.now(), text: input }]);            // Lägg till ny todo med unik id
    setInput("");                                                     // Töm inputfältet
  };

    // Funktion för att ta bort en todo baserat på id
    const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6 border border-indigo-100">

        {/* Inputfält + Lägg till-knapp */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          className="flex-grow p-4 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-lg"
          placeholder="Vad behöver du göra?"
          value={input}                                               // Kopplar inputvärdet till state
          onChange={(e) => setInput(e.target.value)}                  // Uppdaterar state vid inmatning
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}           // Lägg till todo när Enter trycks
          autoFocus                                                   // Gör att inputfältet får fokus direkt när sidan laddas
        />
        <button
          onClick={addTodo}
          className="bg-indigo-500 text-white rounded-xl p-4 hover:bg-indigo-600 transition-all shadow-md"
        >
          <Plus size={20} /> {/* Ikon från Lucide */}
        </button>
      </div>

      {/* Lista med todos */}
      <ul className="space-y-4">
        <AnimatePresence>              {/* AnimatePresence används för att animera bort element som tas bort */}   
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}                        // Startposition (syns inte)
              animate={{ opacity: 1, y: 0 }}                          // Animera in till normal position
              exit={{ opacity: 0, x: 30 }}                            // Animera ut vid borttagning
              layout                                                  // Ger smidig layout-animation vid omordning
              className="bg-indigo-50 p-4 rounded-xl flex justify-between items-center shadow border border-indigo-100 hover:bg-indigo-100 transition"
            >
              <span className="text-gray-800 text-base font-medium">{todo.text}</span>
              <button
                onClick={() => removeTodo(todo.id)} // Kör borttagningsfunktion
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={18} />    {/* Papperskorgsikon från Lucide */}
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}