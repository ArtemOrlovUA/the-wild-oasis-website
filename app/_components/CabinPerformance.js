'use client';

/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';

function CabinPerformance({ cabins = [], bookings = [] }) {
  const [mode, setMode] = useState('revenue'); // 'revenue' | 'rents'

  const stats = useMemo(() => {
    const byCabin = new Map();
    for (const c of cabins) {
      byCabin.set(c.id, {
        id: c.id,
        name: c.name,
        maxCapacity: c.maxCapacity,
        regularPrice: c.regularPrice,
        discount: c.discount,
        revenue: 0,
        rents: 0,
      });
    }
    for (const b of bookings) {
      const rec = byCabin.get(b.cabinId);
      if (!rec) continue;
      rec.revenue += b.totalPrice || 0;
      rec.rents += 1;
    }
    return Array.from(byCabin.values());
  }, [cabins, bookings]);

  const sorted = useMemo(() => {
    const copy = [...stats];
    if (mode === 'revenue') copy.sort((a, b) => b.revenue - a.revenue);
    else copy.sort((a, b) => b.rents - a.rents);
    return copy;
  }, [stats, mode]);

  const baseBtn = 'px-3 py-1 rounded-md text-sm font-medium border transition-colors duration-150';
  const activeBtn = 'bg-accent-500 text-primary-900 border-accent-500';
  const inactiveBtn = 'bg-primary-700 text-primary-100 border-primary-600 hover:bg-primary-600';

  return (
    <div className="col-span-2 border border-primary-700 rounded-md bg-primary-800 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-primary-100 text-xl font-semibold">Cabin performance</h2>
        <div className="flex gap-2">
          <button
            className={`${baseBtn} ${mode === 'revenue' ? activeBtn : inactiveBtn}`}
            onClick={() => setMode('revenue')}>
            By revenue
          </button>
          <button
            className={`${baseBtn} ${mode === 'rents' ? activeBtn : inactiveBtn}`}
            onClick={() => setMode('rents')}>
            By rents
          </button>
        </div>
      </div>
      <div className="overflow-auto grow" style={{ maxHeight: 300 }}>
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-primary-800">
            <tr className="text-primary-300 text-sm">
              <th className="py-2 pr-3 font-medium">Cabin</th>
              <th className="py-2 pr-3 font-medium">Capacity</th>
              <th className="py-2 pr-3 font-medium">Price</th>
              <th className="py-2 pr-3 font-medium">Discount</th>
              <th className="py-2 pr-3 font-medium text-right">
                {mode === 'revenue' ? 'Revenue' : 'Rents'}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} className="border-t border-primary-700 text-primary-100">
                <td className="py-2 pr-3">{c.name}</td>
                <td className="py-2 pr-3">{c.maxCapacity}</td>
                <td className="py-2 pr-3">${c.regularPrice}</td>
                <td className="py-2 pr-3">{c.discount ? `$${c.discount}` : '-'}</td>
                <td className="py-2 pr-3 text-right">
                  {mode === 'revenue' ? `$${c.revenue.toFixed(0)}` : c.rents}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CabinPerformance;
