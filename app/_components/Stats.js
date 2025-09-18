'use client';

/* eslint-disable react/prop-types */
import { useSearchParams } from 'next/navigation';
import {
  BanknotesIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Stat from './Stat';

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value || 0);
  } catch {
    return `$${Number(value || 0).toFixed(0)}`;
  }
}

function Stats({ recentBooking = [], confirmedStays = [], cabinsCount = 0 }) {
  const searchParams = useSearchParams();
  const numDays = Number(searchParams.get('last') || '7');

  const numBookings = recentBooking.length;
  const numSales = recentBooking.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0);
  const checkIns = confirmedStays.length;
  const occupancyRate =
    cabinsCount && numDays
      ? (confirmedStays.reduce((acc, cur) => acc + (cur.numNights || 0), 0) /
          (cabinsCount * numDays)) *
        100
      : 0;

  return (
    <>
      <Stat
        icon={<BriefcaseIcon className="w-7 h-7" />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<BanknotesIcon className="w-7 h-7" />}
        title="Sales"
        value={formatCurrency(numSales)}
        color="green"
      />
      <Stat
        icon={<CalendarDaysIcon className="w-7 h-7" />}
        title="Check ins"
        value={checkIns}
        color="indigo"
      />
      <Stat
        icon={<ChartBarIcon className="w-7 h-7" />}
        title="Occupancy rate"
        value={`${Math.round(occupancyRate)}%`}
        color="yellow"
      />
    </>
  );
}

export default Stats;
