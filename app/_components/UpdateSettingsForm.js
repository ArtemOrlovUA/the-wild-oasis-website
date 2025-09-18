'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { getSettings, updateSettings } from '../_lib/data-service-admin';

function UpdateSettingsForm() {
  const [settings, setSettings] = useState(null);
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);

  useEffect(() => {
    async function init() {
      setIsLoadingSettings(true);
      const settings = await getSettings();
      if (settings) {
        setSettings(settings);
        setIsLoadingSettings(false);
      }
    }
    init();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minBookinglength: '',
      maxBookinglength: '',
      maxGuestsPerBooking: '',
      breakfastPrice: '',
    },
  });

  useEffect(() => {
    setValue('minBookinglength', settings?.minBookinglength);
    setValue('maxBookinglength', settings?.maxBookinglength);
    setValue('maxGuestsPerBooking', settings?.maxGuestsPerBooking);
    setValue('breakfastPrice', settings?.breakfastPrice);
  }, [settings, setValue]);

  async function onSubmit(data) {
    const formattedData = {
      minBookinglength: Number(data.minBookinglength),
      maxBookinglength: Number(data.maxBookinglength),
      maxGuestsPerBooking: Number(data.maxGuestsPerBooking),
      breakfastPrice: Number(data.breakfastPrice),
    };

    for (const key in formattedData) {
      if (!formattedData[key] || formattedData[key] < 1) {
        toast.error('Value must be greater than 0');
        return;
      }
    }

    try {
      setIsUpdatingSettings(true);
      await updateSettings(formattedData);
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error(error.message || 'An error occurred while updating settings');
      console.error(error);
    } finally {
      setIsUpdatingSettings(false);
    }
  }

  if (isLoadingSettings) return <Spinner />;

  return (
    <div>
      <div className="overflow-y-auto w-[60vw] p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Minimum nights/booking */}
          <div>
            <label htmlFor="minBookinglength" className="block font-medium mb-1">
              Minimum nights/booking
            </label>
            <input
              type="number"
              id="minBookinglength"
              placeholder="Minimum nights/booking"
              defaultValue={settings?.minBookinglength}
              {...register('minBookinglength', {
                required: 'This field is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Value must be at least 1' },
              })}
              disabled={isUpdatingSettings}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
            />
            {errors.minBookinglength && (
              <span className="text-[1.4rem] text-red-700">{errors.minBookinglength.message}</span>
            )}
          </div>

          {/* Maximum nights/booking */}
          <div>
            <label htmlFor="maxBookinglength" className="block font-medium mb-1">
              Maximum nights/booking
            </label>
            <input
              type="number"
              id="maxBookinglength"
              placeholder="Maximum nights/booking"
              defaultValue={settings?.maxBookinglength}
              {...register('maxBookinglength', {
                required: 'This field is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Value must be at least 1' },
              })}
              disabled={isUpdatingSettings}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
            />
            {errors.maxBookinglength && (
              <span className="text-[1.4rem] text-red-700">{errors.maxBookinglength.message}</span>
            )}
          </div>

          {/* Maximum guests/booking */}
          <div>
            <label htmlFor="maxGuestsPerBooking" className="block font-medium mb-1">
              Maximum guests/booking
            </label>
            <input
              type="number"
              id="maxGuestsPerBooking"
              placeholder="Maximum guests/booking"
              defaultValue={settings?.maxGuestsPerBooking}
              {...register('maxGuestsPerBooking', {
                required: 'This field is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Value must be at least 1' },
              })}
              disabled={isUpdatingSettings}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
            />
            {errors.maxGuestsPerBooking && (
              <span className="text-[1.4rem] text-red-700">
                {errors.maxGuestsPerBooking.message}
              </span>
            )}
          </div>

          {/* Breakfast price */}
          <div>
            <label htmlFor="breakfastPrice" className="block font-medium mb-1">
              Breakfast price
            </label>
            <input
              type="number"
              id="breakfastPrice"
              placeholder="Breakfast price"
              defaultValue={settings?.breakfastPrice}
              {...register('breakfastPrice', {
                required: 'This field is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Value must be at least 1' },
              })}
              disabled={isUpdatingSettings}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
            />
            {errors.breakfastPrice && (
              <span className="text-[1.4rem] text-red-700">{errors.breakfastPrice.message}</span>
            )}
          </div>

          {/* Кнопка для збереження */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUpdatingSettings}
              className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSettingsForm;
