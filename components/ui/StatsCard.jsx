import React from 'react';
import { Copy } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, status, color = 'gray' }) => {
  const colorClasses = {
    gray: 'text-gray-500',
    green: 'text-green-500',
    orange: 'text-orange-500'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-5 h-5 ${colorClasses[color]}`} />
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
          <Copy className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default StatsCard;