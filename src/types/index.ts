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
}

export interface BoardState {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
  theme: 'light' | 'dark';
}

export interface TaskNew {
  id: string;
  title: string;
}

export interface ColumnNew {
  id: string;
  title: string;
  tasks: TaskNew[];
}