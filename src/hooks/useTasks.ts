
import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { taskService } from '../services/tasks';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadTasks = async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const { data, error } = await taskService.getTasks();
    if (error) {
      console.error('Error loading tasks:', error);
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive"
      });
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'owner_id'>) => {
    console.log('Creating task with data:', taskData);
    const { data, error } = await taskService.createTask(taskData);
    if (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive"
      });
      return null;
    } else {
      toast({
        title: "Success",
        description: "Task created successfully"
      });
      await loadTasks(); // Reload to get fresh data
      return data;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const { data, error } = await taskService.updateTask(id, updates);
    if (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error", 
        description: "Failed to update task",
        variant: "destructive"
      });
      return null;
    } else {
      toast({
        title: "Success",
        description: "Task updated successfully"
      });
      await loadTasks(); // Reload to get fresh data
      return data;
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await taskService.deleteTask(id);
    if (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive"
      });
      return false;
    } else {
      toast({
        title: "Success",
        description: "Task deleted successfully"
      });
      await loadTasks(); // Reload to get fresh data
      return true;
    }
  };

  const shareTask = async (taskId: string, email: string) => {
    const { data, error } = await taskService.shareTask(taskId, email);
    if (error) {
      console.error('Error sharing task:', error);
      toast({
        title: "Error",
        description: "Failed to share task",
        variant: "destructive"
      });
      return null;
    } else {
      toast({
        title: "Success",
        description: `Task shared with ${email}`
      });
      return data;
    }
  };

  useEffect(() => {
    loadTasks();

    // Subscribe to real-time updates
    const subscription = taskService.subscribeToTasks((payload) => {
      console.log('Real-time task update:', payload);
      loadTasks(); // Reload tasks when changes occur
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    shareTask,
    loadTasks
  };
};
