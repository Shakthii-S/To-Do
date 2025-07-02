
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task } from '../../types/task';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onShare: (task: Task) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
  isShared?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onShare,
  onStatusChange,
  isShared = false
}) => {
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'done': return 'default';
      case 'in_progress': return 'secondary';
      case 'todo': return 'outline';
      default: return 'outline';
    }
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date();

  return (
    <Card className={`${isOverdue ? 'border-destructive' : ''} ${isShared ? 'border-l-4 border-l-blue-500' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Badge variant={getPriorityBadgeVariant(task.priority)}>
              {task.priority}
            </Badge>
            <Badge variant={getStatusBadgeVariant(task.status)}>
              {task.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {task.due_date && (
              <span className={isOverdue ? 'text-destructive font-medium' : ''}>
                Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(task.id, 
                task.status === 'todo' ? 'in_progress' : 
                task.status === 'in_progress' ? 'done' : 'todo'
              )}
            >
              {task.status === 'todo' ? 'Start' : 
               task.status === 'in_progress' ? 'Complete' : 'Reopen'}
            </Button>
            {!isShared && (
              <>
                <Button variant="outline" size="sm" onClick={() => onShare(task)}>
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(task.id)}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
