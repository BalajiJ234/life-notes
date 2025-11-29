"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Check,
  X,
  Edit3,
  Save,
  Calendar,
  Flag,
  Search,
  Clock,
  List,
  ChevronLeft,
  ChevronRight,
  Upload,
  Sparkles,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  bulkImportTodos,
  type Todo,
  type TodoType,
  TODO_TYPE_CONFIG,
} from "@/store/slices/todosSlice";
import type { RootState } from "@/store/index";
import BulkImport from "@/components/BulkImport";

const priorityColors = {
  low: "text-green-600 bg-green-100",
  medium: "text-yellow-600 bg-yellow-100",
  high: "text-red-600 bg-red-100",
};

const categories = [
  "Personal",
  "Work",
  "Shopping",
  "Health",
  "Finance",
  "Other",
];

// Day 1 Tasks - 29th Nov 2025
const DAY_1_TASKS: Omit<Todo, "id" | "createdAt">[] = [
  {
    text: "📚 Created Life-Sync 2.0 master documentation (README.md)",
    completed: true,
    priority: "high",
    type: "project",
    category: "Work",
    dayNumber: 1,
    dueDate: "2025-11-29",
  },
  {
    text: "🏗️ Created ARCHITECTURE.md with system design",
    completed: true,
    priority: "high",
    type: "project",
    category: "Work",
    dayNumber: 1,
    dueDate: "2025-11-29",
  },
  {
    text: "📝 Created LEARNING_ROADMAP.md for 4-month journey",
    completed: true,
    priority: "high",
    type: "learning",
    category: "Personal",
    dayNumber: 1,
    dueDate: "2025-11-29",
  },
  {
    text: "✅ Built Life Notes app with Notes & Todos features",
    completed: true,
    priority: "high",
    type: "project",
    category: "Work",
    dayNumber: 1,
    dueDate: "2025-11-29",
  },
  {
    text: "🚀 Pushed life-notes to GitHub repository",
    completed: true,
    priority: "high",
    type: "project",
    category: "Work",
    dayNumber: 1,
    dueDate: "2025-11-29",
  },
  {
    text: "📁 Set up multi-repo architecture (docs + apps)",
    completed: true,
    priority: "high",
    type: "project",
    category: "Work",
    dayNumber: 1,
    dueDate: "2025-11-29",
  },
  {
    text: "📄 Created FOLDER-STRUCTURE.md documentation",
    completed: true,
    priority: "medium",
    type: "project",
    category: "Work",
    dayNumber: 1,
    dueDate: "2025-11-29",
  },
  {
    text: "🔧 Configured .gitignore for multi-repo setup",
    completed: true,
    priority: "medium",
    type: "project",
    category: "Work",
    dayNumber: 1,
    dueDate: "2025-11-29",
  },
  {
    text: "⬆️ Pushed life-sync-2.0 docs to GitHub",
    completed: true,
    priority: "high",
    type: "project",
    category: "Work",
    dayNumber: 1,
    dueDate: "2025-11-29",
  },
  {
    text: "🌐 Deploy life-notes to Vercel",
    completed: false,
    priority: "high",
    type: "project",
    category: "Work",
    dayNumber: 1,
    dueDate: "2025-11-29",
  },
];

export default function TodosPage() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos?.todos || []);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">(
    "medium"
  );
  const [newType, setNewType] = useState<TodoType>("project");
  const [newCategory, setNewCategory] = useState("Personal");
  const [newDueDate, setNewDueDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [typeFilter, setTypeFilter] = useState<TodoType | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [day1Loaded, setDay1Loaded] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = "Todos - Life Notes";
  }, []);

  // Load Day 1 tasks on first load
  const loadDay1Tasks = () => {
    if (day1Loaded) return;
    const tasksToAdd = DAY_1_TASKS.map((task) => ({
      ...task,
      id: `day1-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date("2025-11-29").toISOString(),
    }));
    dispatch(bulkImportTodos(tasksToAdd as Todo[]));
    setDay1Loaded(true);
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        priority: newPriority,
        type: newType,
        dueDate: newDueDate || undefined,
        category: newCategory,
        createdAt: new Date().toISOString(),
      };
      dispatch(addTodo(todo));
      setNewTodo("");
      setNewDueDate("");
    }
  };

  const handleToggleComplete = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      dispatch(
        updateTodo({
          id: editingId,
          updates: { text: editText.trim() },
        })
      );
      setEditingId(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const isDueToday = (dueDate?: string) => {
    if (!dueDate) return false;
    const today = new Date().toDateString();
    const due = new Date(dueDate).toDateString();
    return today === due;
  };

  // Filter todos
  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;
    if (
      searchTerm &&
      !todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    if (categoryFilter !== "all" && todo.category !== categoryFilter)
      return false;
    if (typeFilter !== "all" && todo.type !== typeFilter) return false;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((t: Todo) => t.completed).length,
    active: todos.filter((t: Todo) => !t.completed).length,
    overdue: todos.filter((t: Todo) => !t.completed && isOverdue(t.dueDate))
      .length,
    dueToday: todos.filter((t: Todo) => !t.completed && isDueToday(t.dueDate))
      .length,
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleAddTodo();
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTodosForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return filteredTodos.filter(
      (todo: Todo) =>
        todo.dueDate === dateStr ||
        (todo.createdAt &&
          new Date(todo.createdAt).toISOString().split("T")[0] === dateStr)
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleBulkImport = (data: unknown[]) => {
    dispatch(bulkImportTodos(data as Todo[]));
    setShowBulkImport(false);
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          ✅ Todo Manager
        </h1>
        <p className='text-gray-600'>
          Stay organized and productive with your tasks
        </p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm border text-center'>
          <div className='text-2xl font-bold text-gray-900'>{stats.total}</div>
          <div className='text-sm text-gray-600'>Total</div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border text-center'>
          <div className='text-2xl font-bold text-blue-600'>{stats.active}</div>
          <div className='text-sm text-gray-600'>Active</div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border text-center'>
          <div className='text-2xl font-bold text-green-600'>
            {stats.completed}
          </div>
          <div className='text-sm text-gray-600'>Done</div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border text-center'>
          <div className='text-2xl font-bold text-orange-600'>
            {stats.dueToday}
          </div>
          <div className='text-sm text-gray-600'>Due Today</div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-sm border text-center'>
          <div className='text-2xl font-bold text-red-600'>{stats.overdue}</div>
          <div className='text-sm text-gray-600'>Overdue</div>
        </div>
      </div>

      {/* Day 1 Quick Load */}
      {todos.length === 0 && (
        <div className='bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-lg shadow-sm text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-bold flex items-center gap-2'>
                <Sparkles size={24} />
                Welcome to Day 1! (Nov 29, 2025)
              </h3>
              <p className='text-purple-100 mt-1'>
                Load your first 10 tasks to track what you&apos;ve accomplished
                today!
              </p>
            </div>
            <button
              onClick={loadDay1Tasks}
              className='px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-colors'>
              Load Day 1 Tasks
            </button>
          </div>
        </div>
      )}

      {/* Add Todo */}
      <div className='bg-white p-6 rounded-lg shadow-sm border'>
        <div className='space-y-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <input
                type='text'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder='Add a new task... (Ctrl+Enter to save)'
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
            <div className='flex gap-2 flex-wrap'>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as TodoType)}
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                style={{
                  borderLeftWidth: "4px",
                  borderLeftColor: TODO_TYPE_CONFIG[newType].color,
                }}>
                {Object.entries(TODO_TYPE_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.icon} {config.label}
                  </option>
                ))}
              </select>
              <select
                value={newPriority}
                onChange={(e) =>
                  setNewPriority(e.target.value as "low" | "medium" | "high")
                }
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-4 items-end'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Due Date (Optional)
              </label>
              <input
                type='date'
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='flex gap-2'>
              <button
                onClick={handleAddTodo}
                disabled={!newTodo.trim()}
                className='flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'>
                <Plus size={20} />
                <span>Add Task</span>
              </button>
              <button
                onClick={() => setShowBulkImport(true)}
                className='flex items-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'>
                <Upload size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & View Toggle */}
      <div className='bg-white p-4 rounded-lg shadow-sm border'>
        <div className='flex flex-col gap-4'>
          {/* Type Filter Pills */}
          <div className='flex flex-wrap gap-2'>
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                typeFilter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              All Types
            </button>
            {Object.entries(TODO_TYPE_CONFIG).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setTypeFilter(key as TodoType)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  typeFilter === key
                    ? "text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={
                  typeFilter === key ? { backgroundColor: config.color } : {}
                }>
                <span>{config.icon}</span>
                <span>{config.label}</span>
              </button>
            ))}
          </div>

          <div className='flex flex-col md:flex-row gap-4'>
            {/* Search */}
            <div className='flex-1 relative'>
              <Search
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={20}
              />
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search tasks...'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* View Toggle */}
            <div className='flex bg-gray-100 rounded-lg p-1'>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                <List size={16} />
                <span>List</span>
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "calendar"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                <Calendar size={16} />
                <span>Calendar</span>
              </button>
            </div>

            {/* Status Filter */}
            <div className='flex bg-gray-100 rounded-lg p-1'>
              {(["all", "active", "completed"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === status
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
              <option value='all'>All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === "list" &&
        (filteredTodos.length === 0 ? (
          <div className='text-center py-12'>
            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Check className='h-8 w-8 text-gray-400' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              {searchTerm || categoryFilter !== "all"
                ? "No matching tasks"
                : "No tasks yet"}
            </h3>
            <p className='text-gray-600'>
              {searchTerm || categoryFilter !== "all"
                ? "Try adjusting your filters"
                : "Add your first task to get started!"}
            </p>
          </div>
        ) : (
          <div className='space-y-3'>
            {filteredTodos.map((todo: Todo) => (
              <div
                key={todo.id}
                className={`bg-white p-4 rounded-lg shadow-sm border transition-all ${
                  todo.completed ? "opacity-75" : ""
                } ${
                  isOverdue(todo.dueDate) && !todo.completed
                    ? "border-l-4 border-l-red-500"
                    : ""
                }
                ${
                  isDueToday(todo.dueDate) && !todo.completed
                    ? "border-l-4 border-l-orange-500"
                    : ""
                }`}>
                <div className='flex items-center gap-4'>
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleComplete(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-500"
                    }`}>
                    {todo.completed && <Check size={16} />}
                  </button>

                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    {editingId === todo.id ? (
                      <div className='flex gap-2'>
                        <input
                          type='text'
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={handleEditKeyPress}
                          className='flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
                          autoFocus
                        />
                        <button
                          onClick={saveEdit}
                          className='px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
                          <Save size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className='px-3 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'>
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div
                          className={`font-medium ${
                            todo.completed
                              ? "line-through text-gray-500"
                              : "text-gray-900"
                          }`}>
                          {todo.text}
                        </div>
                        <div className='flex items-center gap-4 mt-2 text-sm text-gray-500 flex-wrap'>
                          {todo.type && TODO_TYPE_CONFIG[todo.type] && (
                            <span
                              className='px-2 py-1 rounded-full text-xs font-medium text-white'
                              style={{
                                backgroundColor:
                                  TODO_TYPE_CONFIG[todo.type].color,
                              }}>
                              {TODO_TYPE_CONFIG[todo.type].icon}{" "}
                              {TODO_TYPE_CONFIG[todo.type].label}
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              priorityColors[todo.priority]
                            }`}>
                            <Flag size={12} className='inline mr-1' />
                            {todo.priority.toUpperCase()}
                          </span>
                          <span className='px-2 py-1 bg-gray-100 rounded-full text-xs'>
                            {todo.category}
                          </span>
                          {todo.dayNumber && (
                            <span className='px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium'>
                              Day {todo.dayNumber}
                            </span>
                          )}
                          {todo.dueDate && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                                isOverdue(todo.dueDate) && !todo.completed
                                  ? "bg-red-100 text-red-600"
                                  : isDueToday(todo.dueDate) && !todo.completed
                                  ? "bg-orange-100 text-orange-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}>
                              <Calendar size={12} />
                              {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          <span className='flex items-center gap-1'>
                            <Clock size={12} />
                            {new Date(todo.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {editingId !== todo.id && (
                    <div className='flex gap-2'>
                      <button
                        onClick={() => startEdit(todo)}
                        className='text-gray-400 hover:text-blue-600 transition-colors'>
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className='text-gray-400 hover:text-red-600 transition-colors'>
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <div className='bg-white p-6 rounded-lg shadow-sm border'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-gray-900'>
              {formatDate(currentDate)}
            </h2>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => navigateMonth("prev")}
                className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg'>
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className='px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg'>
                Today
              </button>
              <button
                onClick={() => navigateMonth("next")}
                className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg'>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className='grid grid-cols-7 gap-1'>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className='p-2 text-center text-sm font-medium text-gray-500 border-b'>
                {day}
              </div>
            ))}

            {(() => {
              const daysInMonth = getDaysInMonth(currentDate);
              const firstDay = getFirstDayOfMonth(currentDate);
              const days = [];

              for (let i = 0; i < firstDay; i++) {
                days.push(
                  <div
                    key={`empty-${i}`}
                    className='h-24 p-1 border border-gray-100'></div>
                );
              }

              for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                );
                const dayTodos = getTodosForDate(date);
                const isToday =
                  date.toDateString() === new Date().toDateString();

                days.push(
                  <div
                    key={day}
                    className={`h-24 p-1 border border-gray-100 ${
                      isToday ? "bg-blue-50 border-blue-200" : ""
                    }`}>
                    <div
                      className={`text-sm font-medium mb-1 ${
                        isToday ? "text-blue-600" : "text-gray-900"
                      }`}>
                      {day}
                    </div>
                    <div className='space-y-1 max-h-16 overflow-y-auto'>
                      {dayTodos.slice(0, 3).map((todo: Todo) => (
                        <div
                          key={todo.id}
                          className={`text-xs p-1 rounded truncate cursor-pointer ${
                            todo.completed
                              ? "bg-green-100 text-green-700 line-through"
                              : priorityColors[todo.priority]
                          }`}
                          onClick={() => handleToggleComplete(todo.id)}
                          title={todo.text}>
                          {todo.text}
                        </div>
                      ))}
                      {dayTodos.length > 3 && (
                        <div className='text-xs text-gray-500 font-medium'>
                          +{dayTodos.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return days;
            })()}
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkImport && (
        <BulkImport
          feature='todos'
          onImport={handleBulkImport}
          onClose={() => setShowBulkImport(false)}
        />
      )}
    </div>
  );
}
