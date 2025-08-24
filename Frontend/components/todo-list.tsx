"use client"

import { TodoItem } from "./todo-item"
import type { Todo } from "@/types/todo"

interface TodoListProps {
  todos: Todo[]
  onUpdate: (id: string, updates: { title?: string; description?: string; completed?: boolean }) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  const activeTodos = todos.filter((todo) => !todo.completed)
  const completedTodos = todos.filter((todo) => todo.completed)

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg">No tasks yet</div>
        <div className="text-muted-foreground text-sm mt-1">Add your first task above to get started!</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {activeTodos.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Active Tasks ({activeTodos.length})</h2>
          <div className="space-y-3">
            {activeTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Completed Tasks ({completedTodos.length})</h2>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
