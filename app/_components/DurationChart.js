'use client';

/* eslint-disable react/prop-types */
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const startData = [
  { duration: '1 night', value: 0, color: '#ef4444' },
  { duration: '2 nights', value: 0, color: '#f97316' },
  { duration: '3 nights', value: 0, color: '#eab308' },
  { duration: '4-5 nights', value: 0, color: '#84cc16' },
  { duration: '6-7 nights', value: 0, color: '#22c55e' },
  { duration: '8-14 nights', value: 0, color: '#14b8a6' },
  { duration: '15-21 nights', value: 0, color: '#3b82f6' },
  { duration: '21+ nights', value: 0, color: '#a855f7' },
];

function prepareData(stays) {
  function inc(arr, field) {
    return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj));
  }
  return stays
    .reduce(
      (arr, cur) => {
        const num = cur.numNights;
        if (num === 1) return inc(arr, '1 night');
        if (num === 2) return inc(arr, '2 nights');
        if (num === 3) return inc(arr, '3 nights');
        if ([4, 5].includes(num)) return inc(arr, '4-5 nights');
        if ([6, 7].includes(num)) return inc(arr, '6-7 nights');
        if (num >= 8 && num <= 14) return inc(arr, '8-14 nights');
        if (num >= 15 && num <= 21) return inc(arr, '15-21 nights');
        if (num >= 21) return inc(arr, '21+ nights');
        return arr;
      },
      [...startData],
    )
    .filter((obj) => obj.value > 0);
}

function DurationChart({ confirmedStays = [] }) {
  const data = prepareData(confirmedStays);
  return (
    <div className="col-span-2 border border-primary-700 rounded-md bg-primary-800 p-6">
      <h2 className="text-primary-100 text-xl font-semibold mb-4">Duration of stays</h2>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={40}
            outerRadius={100}
            paddingAngle={3}>
            {data.map((entry) => (
              <Cell key={entry.duration} fill={entry.color} stroke={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconType="circle"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DurationChart;
