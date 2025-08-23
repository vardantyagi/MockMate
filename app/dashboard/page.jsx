import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddInterview from './_components/AddInterview';
import InterviewList from './_components/InterviewList';

const DashBoard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-gray-500">Create and start your AI mock interview test</p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 transition-all">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Create New Interview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AddInterview />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 transition-all">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Your Previous Interviews</h3>
        <InterviewList />
      </div>
    </div>
  );
};

export default DashBoard;
