const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const getTodos = async () => {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

export const createTodo = async (title: string, description: string) => {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
};

export const updateTodo = async (
  id: string,
  updates: { title?: string; description?: string; completed?: boolean }
) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
};

export const deleteTodo = async (id: string) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
};
