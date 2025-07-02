
import { supabase } from './supabase';
import { Task, SharedTask } from '../types/task';

export const taskService = {
  async getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async getSharedTasks() {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user?.id) return { data: [], error: null };

    const { data, error } = await supabase
      .from('shared_tasks')
      .select(`
        *,
        task:tasks(*)
      `)
      .eq('shared_with', user.user.id);
    
    return { data, error };
  },

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'owner_id'>) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user?.id) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const taskWithOwner = {
      ...task,
      owner_id: user.user.id
    };

    console.log('Creating task with data:', taskWithOwner);

    const { data, error } = await supabase
      .from('tasks')
      .insert([taskWithOwner])
      .select()
      .single();
    
    console.log('Task creation result:', { data, error });
    return { data, error };
  },

  async updateTask(id: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async deleteTask(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    return { error };
  },

  async shareTask(taskId: string, email: string) {
    // Query the profiles table instead of auth.users directly
    const { data: profileData, error: profileError } = await supabase
      .rpc('get_user_id_by_email', { user_email: email });

    if (profileError || !profileData) {
      console.error('Error finding user:', profileError);
      return { data: null, error: { message: 'User not found with that email. They may need to sign up first.' } };
    }

    const { data, error } = await supabase
      .from('shared_tasks')
      .insert([{
        task_id: taskId,
        shared_with: profileData,
        permission: 'read'
      }])
      .select()
      .single();
    
    return { data, error };
  },

  subscribeToTasks(callback: (payload: any) => void) {
    return supabase
      .channel('tasks')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks' }, 
        callback
      )
      .subscribe();
  },

  subscribeToSharedTasks(callback: (payload: any) => void) {
    return supabase
      .channel('shared_tasks')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'shared_tasks' }, 
        callback
      )
      .subscribe();
  }
};
