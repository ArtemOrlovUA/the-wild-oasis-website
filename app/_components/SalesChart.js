'use client';

/* eslint-disable react/prop-types */
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';

function SalesChart({ bookings = [] }) {
  const searchParams = useSearchParams();
  const numDays = Number(searchParams.get('last') || '7');

  const allDates = eachDayOfInterval({ start: subDays(new Date(), numDays - 1), end: new Date() });
  const data = allDates.map((date) => ({
    label: format(date, 'MMM dd'),
    totalSales: bookings
      .filter((b) => isSameDay(date, new Date(b.created_at)))
      .reduce((acc, cur) => acc + (cur.totalPrice || 0), 0),
    extrasSales: bookings
      .filter((b) => isSameDay(date, new Date(b.created_at)))
      .reduce((acc, cur) => acc + (cur.extrasPrice || 0), 0),
  }));

  const colors = {
    totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
    extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
    text: '#e5e7eb',
    background: '#111827',
    grid: '#374151',
  };

  return (
    <div className="col-span-4 border border-primary-700 rounded-md bg-primary-800 p-6">
      <h2 className="text-primary-100 text-xl font-semibold mb-4">
        Sales from {format(subDays(new Date(), numDays - 1), 'MMMM dd yyyy')} to{' '}
        {format(new Date(), 'MMMM dd yyyy')}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="label" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
          <YAxis unit="$" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
          <CartesianGrid stroke={colors.grid} strokeDasharray="4 4" />
          <Tooltip
            contentStyle={{ backgroundColor: colors.background, border: '1px solid #374151' }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
