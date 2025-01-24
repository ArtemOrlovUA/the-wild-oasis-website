'use client';

import { differenceInDays } from 'date-fns';
import { createReservation } from '../_lib/actions';
import { useReservation } from './ReservationContext';
import ButtonForLoading from './ButtonForLoading';

function ReservationForm({
  cabin,
  user,
  isBreakfast,
  handleBreakfastChange,
  numGuests,
  setNumGuests,
  extrasPrice,
}) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);
  console.log(startDate);
  console.log(endDate);

  const bookingData = {
    startDate,
    endDate,
    cabinPrice,
    numNights,
    cabinId: id,
    extrasPrice,
  };

  const createReservationWithData = createReservation.bind(null, bookingData);

  if (!user) error.log('No user provided. Need to be logged in to make a reservation.');

  return (
    <div className="">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex gap-2 justify-end items-center">
        <p>Logged in as {user?.name}</p>

        <img
          referrerPolicy="no-referrer"
          className="h-8 rounded-full"
          src={user.image}
          alt={user.name}
        />
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col justify-between">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required>
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
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className=""></div>
        <label className="flex items-center gap-2" htmlFor="breakfast">
          <input
            type="checkbox"
            name="isBreakfast"
            id="breakfast"
            checked={isBreakfast}
            onChange={handleBreakfastChange}
            className="rounded-sm bg-primary-200 text-primary-800 shadow-sm"
          />
          <span>Include breakfast? (15$ per guest per day)</span>
        </label>

        <div className="flex justify-end items-center gap-6">
          {startDate && endDate && startDate != endDate ? (
            <ButtonForLoading text="Reserve now" />
          ) : (
            <p className="text-primary-300 text-base">Start by selecting dates</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
