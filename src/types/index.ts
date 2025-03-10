export interface Task {
  id: string;
  title: string;
  description: string;
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
