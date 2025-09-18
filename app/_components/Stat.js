'use client';

/* eslint-disable react/prop-types */
function Stat({ icon, title, value, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-600/20 text-blue-300 border-blue-600/40',
    green: 'bg-green-600/20 text-green-300 border-green-600/40',
    indigo: 'bg-indigo-600/20 text-indigo-300 border-indigo-600/40',
    yellow: 'bg-yellow-600/20 text-yellow-300 border-yellow-600/40',
  };

  return (
    <div
      className={`border rounded-lg p-4 bg-primary-800 border-primary-700 flex items-center gap-4`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-md ${colorMap[color]}`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-primary-300 text-sm uppercase tracking-wide">{title}</span>
        <span className="text-primary-100 text-2xl font-semibold">{value}</span>
      </div>
    </div>
  );
}

export default Stat;
