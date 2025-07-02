
import React from 'react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { TaskDashboard } from '../components/Dashboard/TaskDashboard';

const Index = () => {
  return (
    <ProtectedRoute>
      <TaskDashboard />
    </ProtectedRoute>
  );
};

export default Index;
