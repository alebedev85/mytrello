export type Priority = "high" | "medium" | "low" | "none";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  createdAt?: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
  color?: string;
}

export interface BoardState {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
  theme: "light" | "dark";
}

export interface PopupState {
  isOpen: boolean;
  type: "column" | "task" | null;
  targetId: targetId | null;
}

export interface targetId {
  taskId: string;
  columnId: string;
}

export interface User {
  email: string | null;
  token: string | null;
  id: string | null;
}
