"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.className = saved;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title.trim(), description: description.trim() }),
    });

    if (res.ok) {
      showMessage("Task created successfully");
      setTimeout(() => router.push("/"), 1000);
    } else {
      showMessage("Error creating task");
    }
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        className="fixed top-5 right-5 px-4 py-1.5 rounded-xl  text-white hover:bg-blue-700 transition shadow z-10" style={{ background: 'var(--text)' }}
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>

      <main className="min-h-screen flex justify-center p-6" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          {message && (
            <div className="fixed top-6 right-6 toast px-5 py-3 rounded-xl shadow-xl z-20" style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}>
              {message}
            </div>
          )}

          <h1 className="text-3xl font-bold text-center mb-6 tracking-tight">
            Create New Task
          </h1>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1" style={{ color: 'var(--subtext)' }}>
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl outline-none focus:border-blue-600 transition"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1" style={{ color: 'var(--subtext)' }}>
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-xl outline-none resize-none h-28 focus:border-blue-600 transition
                placeholder:text-gray-450 dark:placeholder:text-gray-450"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}
                placeholder="Enter task description..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-lg"
            >
              Create Task
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full py-2 mt-1 transition"
              style={{ color: 'var(--subtext)' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--text)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--subtext)'}
            >
              ← Back to Tasks
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
