import React from 'react';

export function UserStats({ leftStats, rightStats }) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-2">
        {leftStats.map((stat) => (
          <div
            key={stat.title}
            className="flex justify-between border-b border-[#E7E7E7] py-2 text-sm"
          >
            <span className="text-[#5C5C5C]">{stat.title}</span>
            <span className="font-medium text-[#2C3333]">{stat.count}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {rightStats.map((stat) => (
          <div
            key={stat.title}
            className="flex justify-between border-b border-[#E7E7E7] py-2 text-sm"
          >
            <span className="text-[#5C5C5C]">{stat.title}</span>
            <span className="font-medium text-[#2C3333]">{stat.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

