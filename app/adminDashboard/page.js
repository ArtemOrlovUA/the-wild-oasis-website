'use client';

import { useEffect, useState } from 'react';
import { getCabins, getCurrentUser } from '../_lib/data-service-admin';
import { useRouter } from 'next/navigation';

import CreateCabinForm from '../_components/CreateCabinForm';
import CabinListAdminPanel from '../_components/CabinListAdminPanel';
import Spinner from '../_components/Spinner';
import UpdateSettingsForm from '../UpdateSettingsForm';

function Page() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [cabins, setCabins] = useState([]);
  const [isCreateFormOpened, setIsCreateFormOpened] = useState(true);
  const [isCabinListOpened, setIsCabinListOpened] = useState(true);
  const [isBookingSettingsOpened, setIsBookingSettingsOpened] = useState(true);

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
      {/*Create cabin form*/}
      <div className="flex flex-col min-w-[72rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold pl-3">Create cabin</h1>
          <button
            onClick={() => setIsCreateFormOpened(!isCreateFormOpened)}
            type="button"
            className="bg-accent-500 px-8 py-3 rounded-[20px] text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all duration-200">
            {isCreateFormOpened ? 'Hide' : 'Show'} form
          </button>
        </div>
        <div className={`${isCreateFormOpened ? '' : 'hidden'}`}>
          <CreateCabinForm />
        </div>
      </div>

      {/*Cabins list*/}
      <div className="flex flex-col min-w-[72rem] gap-y-[1rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold pl-3">Cabins list</h1>
          <button
            onClick={() => setIsCabinListOpened(!isCabinListOpened)}
            type="button"
            className="bg-accent-500 px-8 py-3 rounded-[20px] text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all duration-200">
            {isCabinListOpened ? 'Hide' : 'Show'} cabins
          </button>
        </div>
        <div className={`${isCabinListOpened ? '' : 'hidden'}`}>
          {<CabinListAdminPanel cabins={cabins} />}
        </div>
      </div>

      {/*Booking settings*/}
      <div className="flex flex-col min-w-[72rem] gap-y-[1rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold pl-3">Booking settings</h1>
          <button
            onClick={() => setIsBookingSettingsOpened(!isBookingSettingsOpened)}
            type="button"
            className="bg-accent-500 px-8 py-3 rounded-[20px] text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all duration-200">
            {isBookingSettingsOpened ? 'Hide' : 'Show'} booking settings
          </button>
        </div>
        <div className={`${isBookingSettingsOpened ? '' : 'hidden'}`}>{<UpdateSettingsForm />}</div>
      </div>
    </div>
  );
}

export default Page;
