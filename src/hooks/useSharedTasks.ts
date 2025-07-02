
import { useState, useEffect } from 'react';
import { SharedTask } from '../types/task';
import { taskService } from '../services/tasks';
import { useAuth } from '../contexts/AuthContext';

export const useSharedTasks = () => {
  const [sharedTasks, setSharedTasks] = useState<SharedTask[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadSharedTasks = async () => {
    if (!user) {
      setSharedTasks([]);
      setLoading(false);
      return;
    }

    const { data, error } = await taskService.getSharedTasks();
    if (error) {
      console.error('Error loading shared tasks:', error);
    } else {
      setSharedTasks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSharedTasks();

    // Subscribe to real-time updates for shared tasks
    const subscription = taskService.subscribeToSharedTasks((payload) => {
      console.log('Real-time shared task update:', payload);
      loadSharedTasks(); // Reload shared tasks when changes occur
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return {
    sharedTasks,
    loading,
    loadSharedTasks
  };
};
