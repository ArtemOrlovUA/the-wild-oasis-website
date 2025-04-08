'use client';

import { useState } from 'react';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

function ReservationWrapper({ settings, bookedDates, cabin, user }) {
  const [isBreakfast, setIsBreakfast] = useState(false);
  const [numGuests, setNumGuests] = useState(1);
  const [extrasPrice, setExtrasPrice] = useState(0);

  function handleBreakfastChange() {
    setIsBreakfast((prev) => !prev);
  }

  return (
    <>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
        numGuests={numGuests}
        isBreakfast={isBreakfast}
        extrasPrice={extrasPrice}
        setExtrasPrice={setExtrasPrice}
      />
      <ReservationForm
        cabin={cabin}
        user={user}
        isBreakfast={isBreakfast}
        handleBreakfastChange={handleBreakfastChange}
        numGuests={numGuests}
        setNumGuests={setNumGuests}
        extrasPrice={extrasPrice}
        settings={settings}
      />
    </>
  );
}

export default ReservationWrapper;
