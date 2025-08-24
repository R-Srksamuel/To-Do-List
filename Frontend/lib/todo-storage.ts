import type { Todo } from "@/types/todo"

// Simple in-memory storage for API routes (simulating MongoDB)
const todos: Todo[] = [
  {
    id: "1",
    title: "Learn React",
    description: "Study React fundamentals and hooks",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Build Todo App",
    description: "Create a full-stack MERN todo application",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const todoStorage = {
  getAll: (): Todo[] => {
    return todos
  },

  getById: (id: string): Todo | undefined => {
    return todos.find((todo) => todo.id === id)
  },

  create: (todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">): Todo => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    todos.push(newTodo)
    return newTodo
  },

  update: (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>): Todo | null => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex === -1) return null

    todos[todoIndex] = {
      ...todos[todoIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return todos[todoIndex]
  },

  delete: (id: string): boolean => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex === -1) return false

    todos.splice(todoIndex, 1)
    return true
  },
}
