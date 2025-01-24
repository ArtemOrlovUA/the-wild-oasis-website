import Link from 'next/link';
import { auth } from '../_lib/auth';
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import ReservationWrapper from './ReservationWrapper';

async function Reservation({ cabin }) {
  const session = await auth();

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <>
      {session?.user ? (
        <div className="border border-primary-800 min-h-[400px]">
          <ReservationWrapper // needed for use of hooks
            settings={settings}
            bookedDates={bookedDates}
            cabin={cabin}
            user={session?.user}
          />
        </div>
      ) : (
        <span className="text-center flex justify-center">
          <Link
            href={'/login'}
            className="hover:text-accent-400 transition-colors text-5xl mb-16 font-semibold text-center">
            Log in to reserve right now!
          </Link>
        </span>
      )}
    </>
  );
}

export default Reservation;
