import ButtonForLoading from '@/app/_components/ButtonForLoading';
import { updateReservation } from '@/app/_lib/actions';
import { auth } from '@/app/_lib/auth';
import { getBooking, getBookings, getCabin } from '@/app/_lib/data-service';

export async function generateMetadata({ params }) {
  const booking = await getBooking(params.bookingId);

  return {
    title: `Edit of reservation ${booking.id}`,
  };
}

export default async function Page({ params }) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(parseInt(params.bookingId))) {
    throw new Error('Error: booking does not belong to the user');
  }

  const booking = await getBooking(params.bookingId);

  const { id: reservationId, cabinId, observations, numGuests } = booking;

  const cabin = await getCabin(cabinId);

  const { maxCapacity } = cabin;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            defaultValue={numGuests}
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required>
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">Anything we should know about your stay?</label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <input name="bookingId" value={reservationId} className="hidden" />

        <div className="flex justify-end items-center gap-6">
          <ButtonForLoading text="Update reservation" />
        </div>
      </form>
    </div>
  );
}
