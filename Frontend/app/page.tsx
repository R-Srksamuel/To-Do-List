"use client"

import { useState, useEffect } from "react"
import { AddTodoForm } from "@/components/add-todo-form"
import { TodoList } from "@/components/todo-list"
import { CheckSquare } from "lucide-react"
import type { Todo } from "@/types/todo"
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/utils/api"

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const data = await getTodos()
      if (data.success) {
        setTodos(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTodo = async (title: string, description: string) => {
    try {
      const data = await createTodo(title, description)
      if (data.success) {
        setTodos([data.data, ...todos])
      }
    } catch (error) {
      console.error("Failed to add todo:", error)
    }
  }

  const handleUpdateTodo = async (
    id: string,
    updates: { title?: string; description?: string; completed?: boolean }
  ) => {
    try {
      const data = await updateTodo(id, updates)
      if (data.success) {
        setTodos(todos.map((todo) => (todo.id === id ? data.data : todo)))
      }
    } catch (error) {
      console.error("Failed to update todo:", error)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      const data = await deleteTodo(id)
      if (data.success) {
        setTodos(todos.filter((todo) => todo.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete todo:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Todo List</h1>
          </div>
          <p className="text-muted-foreground">
            Organize your tasks and boost your productivity
          </p>
        </div>

        {/* Add Todo Form */}
        <AddTodoForm onAdd={handleAddTodo} />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <span>Total: {todos.length}</span>
              <span>Active: {todos.filter((t) => !t.completed).length}</span>
              <span>Completed: {todos.filter((t) => t.completed).length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
