'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabasePublic } from './supabase';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';

const isCorrectNationalID = /^[a-zA-Z0-9]{6,15}$/;

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!isCorrectNationalID.test(nationalID)) {
    throw new Error('Invalid national ID: only numbers and english letters, 6-15 characters');
  }

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }

  try {
    revalidatePath('/account/profile');
  } catch (error) {
    console.error('Revalidation failed:', error);
  }
}

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  console.log(bookingData);

  const newReservation = {
    ...bookingData,
    startDate: new Date(
      new Date(bookingData.startDate).setUTCDate(new Date(bookingData.startDate).getUTCDate() + 1),
    ).toISOString(),
    endDate: new Date(
      new Date(bookingData.endDate).setUTCDate(new Date(bookingData.endDate).getUTCDate() + 1),
    ).toISOString(),
    guestId: session.user.guestId,
    numGuests: parseInt(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    totalPrice: bookingData.cabinPrice + bookingData.extrasPrice,
    status: 'unconfirmed',
    isPaid: false,
    hasBreakfast: formData.get('isBreakfast') === 'on' ? true : false,
  };

  console.log(newReservation);

  const { data, error } = await supabase
    .from('bookings')
    .insert([newReservation])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Reservation could not be created');
  }

  try {
    revalidatePath('/account/reservations');
    revalidatePath(`/cabins/${bookingData?.cabinId}`);
  } catch (error) {
    console.error('Revalidation failed:', error);
  }

  redirect(`/cabins/thankyou`);
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  const bookingId = formData.get('bookingId');

  if (!guestBookingIds.includes(parseInt(bookingId))) {
    throw new Error('Error: booking does not belong to the user');
  }

  const numGuests = parseInt(formData.get('numGuests'), 10);
  const observations = formData.get('observations');

  const { data: booking, error } = await supabase
    .from('bookings')
    .update({ numGuests, observations })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Reservation could not be updated');
  }

  try {
    revalidatePath('/account/reservations');
    revalidatePath(`/account/reservations/edit/${bookingId}`);
  } catch (error) {
    console.error('Revalidation failed:', error);
  }

  redirect(`/account/reservations`);
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('Unauthorized: booking does not belong to the user');
  }

  const { data, error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  try {
    revalidatePath('/account/reservations');
  } catch (error) {
    console.error('Revalidation failed:', error);
  }
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
