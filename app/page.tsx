"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Client-side service for API calls
class ClientTaskService {
  async fetchTasks() {
    const response = await fetch("/api/tasks");
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  }

  async toggleTaskStatus(id: string) {
    const response = await fetch(`/api/tasks/${id}`, { method: "PATCH" });
    if (!response.ok) throw new Error("Failed to update task status");
    return response.json();
  }

  async deleteTask(id: string) {
    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete task");
    return response.json();
  }

  async getTaskStats() {
    const response = await fetch("/api/tasks/stats");
    if (!response.ok) throw new Error("Failed to fetch task statistics");
    return response.json();
  }

  filterTasks(tasks: any[], filter: string) {
    if (filter === "all") return tasks;
    return tasks.filter(task => task.status === filter);
  }
}

const clientTaskService = new ClientTaskService();

function ThemeWrapper({ children }: { children: React.ReactNode }) {
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

  return (
    <>
      <button
        onClick={toggleTheme}
        className="fixed top-5 right-5 px-4 py-1.5 rounded-xl  text-white hover:bg-blue-700 transition shadow z-10" style={{ background: 'var(--text)' }}
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
      {children}
    </>
  );
}

function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [stats, setStats] = useState<{ total: number; pending: number; completed: number }>({ total: 0, pending: 0, completed: 0 });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await clientTaskService.fetchTasks();
      setTasks(data);
    } catch (error) {
      showMessage("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await clientTaskService.getTaskStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats");
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const toggleStatus = async (id: string) => {
    try {
      await clientTaskService.toggleTaskStatus(id);
      showMessage("Task updated");
      fetchTasks();
      fetchStats();
    } catch (error) {
      showMessage("Failed to update task");
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await clientTaskService.deleteTask(id);
      showMessage("Task deleted");
      fetchTasks();
      fetchStats();
    } catch (error) {
      showMessage("Failed to delete task");
    }
  };

  const editTask = (id: string) => {
    router.push(`/edit/${id}`);
  };
  
  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const filteredTasks = clientTaskService.filterTasks(tasks, filter);

  return (
    <main className="min-h-screen flex justify-center p-6" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="w-full max-w-2xl">
        {message && (
          <div className="fixed top-6 right-6 toast px-5 py-3 rounded-xl shadow-xl z-20" style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            {message}
          </div>
        )}

        <h1 className="text-4xl font-bold text-center mb-8 tracking-tight">
          Task Manager
        </h1>

        {/* Task Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm" style={{ color: 'var(--subtext)' }}>Total Tasks</div>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
            <div className="text-sm" style={{ color: 'var(--subtext)' }}>Pending</div>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
            <div className="text-sm" style={{ color: 'var(--subtext)' }}>Completed</div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {["all", "pending", "completed"].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-xl transition font-medium hover:shadow-md ${
                filter === key ? "bg-blue-600 text-white shadow-lg" : ""
              }`}
              style={filter === key ? {} : { background: 'var(--card)', color: 'var(--subtext)' }}
              onMouseEnter={(e) => {
                if (filter !== key) e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                if (filter !== key) e.currentTarget.style.transform = 'translateY(0px)';
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Create Task Button */}
        <div className="flex justify-center mb-6">
          <a
            href="/new"
            className="px-5 py-2.5 text-center bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-md"
          >
            + Create Task
          </a>
        </div>

        {/* Loading State */}
        {loading && (
          <p 
            className="text-center mt-10" 
            style={{ color: 'var(--subtext)' }}
          >
            Loading tasks...
          </p>
        )}

        {/* Empty State */}
        {!loading && filteredTasks.length === 0 && (
          <p 
            className="text-center mt-8" 
            style={{ color: 'var(--subtext)' }}
          >
            No tasks found for the current filter.
          </p>
        )}

        {/* Task List */}
        <ul className="space-y-5">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="p-5 rounded-2xl shadow-lg flex justify-between items-center"
              style={{ 
                background: 'var(--card)', 
                border: '1px solid var(--border)' 
              }}
            >
              <div className="flex flex-col gap-2 items-start">
                {/* Status Badge */}
                    <span
                    className={`px-3 py-1 text-xs rounded-full mb-1 font-medium ${
                        task.status === "completed"
                        ? "bg-green-800 text-green-200"
                        : "bg-yellow-800 text-yellow-200"
                    }`}
                    >
                    {task.status}
                    </span>
                {/* Task Content */}
                <div className="w-3/4">
                    <h3 className="text-xl font-semibold mb-1">{task.title}</h3>
                    <p 
                    className="text-sm mb-1" 
                    style={{ color: 'var(--subtext)' }}
                    >
                    {task.description}
                    </p>
                    <p 
                    className="text-xs" 
                    style={{ color: 'var(--subtext)' }}
                    >
                    {new Date(task.createdAt).toLocaleString()}
                    </p>
                </div>
              </div>

              {/* Task Actions */}
              <div className="flex flex-col gap-2 items-end">


                {/* Action Buttons */}
                <button
                  onClick={() => toggleStatus(task.id)}
                  className="px-4 py-1.5 text-sm rounded-lg transition font-medium shadow-md hover:shadow-lg hover:scale-105 dark:bg-black dark:text-white dark:hover:bg-gray-900"
                  style={{ 
                    background: 'var(--bg)', 
                    color: 'var(--text)'
                  }}
                >
                  Toggle
                </button>
                
                <button
                  onClick={() => editTask(task.id)}
                  className="px-4 py-1.5 text-sm rounded-lg transition font-medium shadow-md hover:shadow-lg hover:scale-105 dark:bg-black dark:text-white dark:hover:bg-gray-900"
                  style={{ 
                    background: 'var(--bg)', 
                    color: 'var(--text)'
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <ThemeWrapper>
      <Home />
    </ThemeWrapper>
  );
}
