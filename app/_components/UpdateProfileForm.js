'use client';

import { useState } from 'react';
import { updateGuest } from '../_lib/actions';
import { useFormStatus } from 'react-dom';
import ButtonForLoading from './ButtonForLoading';
import toast from 'react-hot-toast';

function UpdateProfileForm({ children, guest }) {
  const [isFunctional, setIsFunctional] = useState(true);

  const [fullName, setFullName] = useState(guest?.fullName || '');
  const [nationalID, setNationalID] = useState(guest?.nationalID || '');

  const isValidID = (s) => /^[a-zA-Z0-9]{6,15}$/.test(s);
  const isValidName = (s) => /^[A-Za-z ]{4,64}$/.test(s);

  return (
    <form action={updateGuest} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullName"
          onChange={(e) => {
            setIsFunctional(isValidName(e.target.value));
            setFullName(e.target.value);
          }}
          defaultValue={guest?.fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
        {!isValidName(fullName) && (
          <p className="text-red-500 text-sm">
            Invalid name: only english letters and spaces, 4-64 characters long
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          readOnly
          name="email"
          defaultValue={guest?.email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img src={guest.countryFlag} alt="Country flag" className="h-5 rounded-sm" />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={guest?.nationalID}
          onChange={(e) => {
            setIsFunctional(isValidID(e.target.value));
            setNationalID(e.target.value);
          }}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />

        {!isValidID(nationalID) && (
          <p className="text-red-500 text-sm">
            Invalid national ID: only numbers and english letters, 6-15 characters
          </p>
        )}
      </div>

      <div className="flex justify-end items-center gap-6">
        <ButtonForLoading text="Update profile" isFunctional={isFunctional} />
      </div>
    </form>
  );
}

export default UpdateProfileForm;
