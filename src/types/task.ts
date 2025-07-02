export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  created_at: string;
  updated_at?: string;
  owner_id: string;
}

export interface SharedTask {
  id: string;
  task_id: string;
  shared_with: string;
  shared_by: string;
  permission: 'read' | 'write';
  created_at: string;
  task?: Task;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}
