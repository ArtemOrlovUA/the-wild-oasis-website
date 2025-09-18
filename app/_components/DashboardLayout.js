'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Spinner from './Spinner';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import CabinPerformance from './CabinPerformance';
import {
  getBookingsAfterDate,
  getCabins as getCabinsAdmin,
  getStaysAfterDate,
} from '../_lib/data-service-admin';

function subDaysISO(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

function DashboardLayout() {
  const searchParams = useSearchParams();
  const numDays = Number(searchParams.get('last') || '7');
  const since = useMemo(() => subDaysISO(numDays - 1), [numDays]);

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [stays, setStays] = useState([]);
  const [cabins, setCabins] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    Promise.all([getBookingsAfterDate(since), getStaysAfterDate(since), getCabinsAdmin()])
      .then(([b, s, c]) => {
        if (isCancelled) return;
        setBookings(b || []);
        // Only confirmed stays for duration chart and stats
        setStays(
          (s || []).filter((st) => st.status === 'checked-in' || st.status === 'checked-out'),
        );
        setCabins(c || []);
      })
      .finally(() => !isCancelled && setLoading(false));
    return () => {
      isCancelled = true;
    };
  }, [since]);

  if (loading) return <Spinner />;

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_20rem_auto] gap-6 w-full">
      <Stats recentBooking={bookings} confirmedStays={stays} cabinsCount={cabins?.length || 0} />
      <DurationChart confirmedStays={stays} />
      <CabinPerformance cabins={cabins} bookings={bookings} />
      <SalesChart bookings={bookings} />
    </div>
  );
}

export default DashboardLayout;
