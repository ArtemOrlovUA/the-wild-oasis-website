'use client';

import { useEffect, useState } from 'react';
import { getCabins, getCurrentUser } from '../_lib/data-service-admin';
import { useRouter } from 'next/navigation';
import { supabasePublic } from '../_lib/supabaseAdmin';

import CreateCabinForm from '../_components/CreateCabinForm';
import CabinListAdminPanel from '../_components/CabinListAdminPanel';
import Spinner from '../_components/Spinner';
import UpdateSettingsForm from '../_components/UpdateSettingsForm';
import Dashboard from '../_components/Dashboard';

function Page() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [cabins, setCabins] = useState([]);
  const [sortField, setSortField] = useState('price'); // 'price' | 'guests'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (More first) | 'asc' (Less first)
  const [isCreateFormOpened, setIsCreateFormOpened] = useState(true);
  const [isCabinListOpened, setIsCabinListOpened] = useState(true);
  const [isBookingSettingsOpened, setIsBookingSettingsOpened] = useState(true);
  const [isAnalyticsOpened, setIsAnalyticsOpened] = useState(true);

  useEffect(() => {
    async function init() {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/adminLogin');
      } else {
        setUser(user);
      }

      const cabins = await getCabins();
      if (cabins.length > 0) {
        setCabins(cabins);
      }
    }
    init();
  }, [router]);
  if (!user) return <Spinner />;

  return (
    <div className="flex flex-col justify-center gap-y-[3rem] items-center">
      {/* Top info bar */}
      <div className="flex items-center justify-between w-full max-w-[72rem] bg-primary-800 border border-primary-700 rounded-xl px-6 py-4">
        <p className="text-primary-200">
          Logged in as{' '}
          <span className="font-semibold text-primary-100">
            {user?.user_metadata?.name || user?.email || 'Admin'}
          </span>
        </p>
        <button
          type="button"
          onClick={async () => {
            await supabasePublic.auth.signOut();
            router.push('/adminLogin');
          }}
          className="bg-accent-500 px-5 py-2 rounded-lg text-primary-900 font-semibold hover:bg-accent-600 transition-colors">
          Log out
        </button>
      </div>

      {/*Analytics*/}
      <div className="flex flex-col min-w-[72rem] gap-y-[1rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold pl-3">Analytics</h1>
          <button
            onClick={() => setIsAnalyticsOpened(!isAnalyticsOpened)}
            type="button"
            className="bg-accent-500 px-8 pt-3 pb-2 rounded-[20px] text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all duration-200">
            {isAnalyticsOpened ? 'Hide' : 'Show'} analytics
          </button>
        </div>
        <div className={`${isAnalyticsOpened ? '' : 'hidden'}`}>
          <div className="w-full max-w-[72rem] mx-auto border border-primary-700 rounded-xl p-6 bg-primary-900/30">
            <Dashboard />
          </div>
        </div>
      </div>

      {/*Create cabin form*/}
      <div className="flex flex-col min-w-[72rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold pl-3">Create cabin</h1>
          <button
            onClick={() => setIsCreateFormOpened(!isCreateFormOpened)}
            type="button"
            className="bg-accent-500 px-8 pt-3 pb-2 rounded-[20px] text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all duration-200">
            {isCreateFormOpened ? 'Hide' : 'Show'} form
          </button>
        </div>
        <div className={`flex justify-center ${isCreateFormOpened ? '' : 'hidden'}`}>
          <CreateCabinForm />
        </div>
      </div>

      {/*Cabins list*/}
      <div className="flex flex-col min-w-[72rem] gap-y-[1rem]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-4xl font-bold pl-3">Cabins list</h1>
            <div className={`flex items-center gap-6 ${isCabinListOpened ? '' : 'hidden'}`}>
              <div className="flex items-center gap-2">
                <span className="text-primary-300 text-sm uppercase tracking-wide">Filter:</span>
                <button
                  type="button"
                  onClick={() => setSortField('price')}
                  className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
                    sortField === 'price'
                      ? 'bg-accent-500 text-primary-900 border-accent-500'
                      : 'bg-primary-700 text-primary-100 border-primary-600 hover:bg-primary-600'
                  }`}>
                  By price
                </button>
                <button
                  type="button"
                  onClick={() => setSortField('guests')}
                  className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
                    sortField === 'guests'
                      ? 'bg-accent-500 text-primary-900 border-accent-500'
                      : 'bg-primary-700 text-primary-100 border-primary-600 hover:bg-primary-600'
                  }`}>
                  By number of guests
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-300 text-sm uppercase tracking-wide">Order:</span>
                <button
                  type="button"
                  onClick={() => setSortOrder('desc')}
                  className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
                    sortOrder === 'desc'
                      ? 'bg-accent-500 text-primary-900 border-accent-500'
                      : 'bg-primary-700 text-primary-100 border-primary-600 hover:bg-primary-600'
                  }`}>
                  More first
                </button>
                <button
                  type="button"
                  onClick={() => setSortOrder('asc')}
                  className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
                    sortOrder === 'asc'
                      ? 'bg-accent-500 text-primary-900 border-accent-500'
                      : 'bg-primary-700 text-primary-100 border-primary-600 hover:bg-primary-600'
                  }`}>
                  Less first
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsCabinListOpened(!isCabinListOpened)}
            type="button"
            className="bg-accent-500 px-8 pt-3 pb-2 rounded-[20px] text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all duration-200">
            {isCabinListOpened ? 'Hide' : 'Show'} cabins
          </button>
        </div>
        <div className={`${isCabinListOpened ? '' : 'hidden'}`}>
          {(() => {
            const sortedCabins = [...cabins].sort((a, b) => {
              const fieldA = sortField === 'price' ? a.regularPrice ?? 0 : a.maxCapacity ?? 0;
              const fieldB = sortField === 'price' ? b.regularPrice ?? 0 : b.maxCapacity ?? 0;
              if (sortOrder === 'asc') return fieldA - fieldB;
              return fieldB - fieldA;
            });
            return <CabinListAdminPanel cabins={sortedCabins} />;
          })()}
        </div>
      </div>

      {/*Booking settings*/}
      <div className="flex flex-col min-w-[72rem] gap-y-[1rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold pl-3">Booking settings</h1>
          <button
            onClick={() => setIsBookingSettingsOpened(!isBookingSettingsOpened)}
            type="button"
            className="bg-accent-500 px-8 pt-3 pb-2 rounded-[20px] text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all duration-200">
            {isBookingSettingsOpened ? 'Hide' : 'Show'} booking settings
          </button>
        </div>
        <div className={`flex justify-center ${isBookingSettingsOpened ? '' : 'hidden'}`}>
          {<UpdateSettingsForm />}
        </div>
      </div>
    </div>
  );
}

export default Page;
