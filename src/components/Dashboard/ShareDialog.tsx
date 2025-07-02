
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Task } from '../../types/task';

interface ShareDialogProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onShare: (taskId: string, email: string) => void;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({
  task,
  isOpen,
  onClose,
  onShare
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!task || !email) return;
    
    setLoading(true);
    try {
      await onShare(task.id, email);
      setEmail('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Task: {task?.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleShare} disabled={!email || loading}>
              {loading ? 'Sharing...' : 'Share Task'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
