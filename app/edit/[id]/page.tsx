"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function EditTask({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.className = saved;
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`/api/tasks/${id}`);
      if (res.ok) {
        const task = await res.json();
        setTitle(task.title);
        setDescription(task.description);
      } else {
        showMessage("Failed to load task");
      }
      setLoading(false);
    };
    fetchTask();
  }, [id]);

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

    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title.trim(), description: description.trim() }),
    });

    if (res.ok) {
      showMessage("Task updated successfully");
      setTimeout(() => router.push("/"), 1000);
    } else {
      showMessage("Error updating task");
    }
  };

  if (loading) {
    return (
      <>
        <button
          onClick={toggleTheme}
          className="fixed top-5 right-5 px-4 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow z-10"
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <main className="min-h-screen flex justify-center items-center p-6" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
          <p style={{ color: 'var(--subtext)' }}>Loading task...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <button
        onClick={toggleTheme}
        className="fixed top-5 right-5 px-4 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow z-10"
      >
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <main className="min-h-screen flex justify-center p-6" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          {message && (
            <div className="fixed top-6 right-6 px-5 py-3 rounded-xl shadow toast z-20" style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}>
              {message}
            </div>
          )}

          <h1 className="text-3xl font-bold text-center mb-6">
            Edit Task
          </h1>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2" style={{ color: 'var(--subtext)' }}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-xl outline-none focus:border-blue-600 transition"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}
                placeholder="Enter task title..."
                required
              />
            </div>

            <div>
              <label className="block mb-2" style={{ color: 'var(--subtext)' }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-28 px-4 py-2 rounded-xl outline-none focus:border-blue-600 transition"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}
                placeholder="Enter task description..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow font-medium"
            >
              Update Task
            </button>
          </form>

          <button
            onClick={() => router.push("/")}
            className="block mx-auto mt-4 transition"
            style={{ color: 'var(--subtext)' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--subtext)'}
          >
            ← Back
          </button>
        </div>
      </main>
    </>
  );
}
