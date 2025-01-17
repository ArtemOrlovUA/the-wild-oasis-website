'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';

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
