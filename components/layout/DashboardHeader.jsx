import React from 'react';
import { Menu } from 'lucide-react';

const DashboardHeader = ({ setIsOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        
        <div className="flex-1 lg:flex-none" />
        
        {/* Future header items like notifications, profile, etc */}
      </div>
    </header>
  );
};

export default DashboardHeader;