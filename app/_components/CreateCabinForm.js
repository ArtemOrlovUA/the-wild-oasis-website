'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ButtonForLoading from './ButtonForLoading';
import { useState } from 'react';
import { createCabin } from '../_lib/actions';

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const regularPrice = watch('regularPrice');

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      // Create FormData object to handle file upload
      const formData = new FormData();

      // Append all form fields to FormData
      Object.keys(data).forEach((key) => {
        if (key === 'image' && data[key] instanceof FileList) {
          // Handle file upload
          formData.append('image', data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      // Call the server action with FormData
      await createCabin(formData);

      reset();
      toast.success('Cabin created successfully!');
    } catch (error) {
      toast.error(error.message || 'An error occurred while creating the cabin');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <div className="overflow-y-auto w-[60vw] p-4">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* Cabin Name */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Cabin name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Cabin name"
            {...register('name', { required: 'This field is required' })}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
          />
          {errors?.name && (
            <span className="text-[1.4rem] text-red-700">{errors.name.message}</span>
          )}
        </div>

        {/* Maximum Capacity */}
        <div>
          <label htmlFor="maxCapacity" className="block font-medium mb-1">
            Maximum capacity
          </label>
          <input
            type="number"
            id="maxCapacity"
            placeholder="Maximum capacity"
            {...register('maxCapacity', {
              required: 'This field is required',
              min: { value: 1, message: 'At least one guest' },
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
          />
          {errors?.maxCapacity && (
            <span className="text-[1.4rem] text-red-700">{errors.maxCapacity.message}</span>
          )}
        </div>

        {/* Regular Price */}
        <div>
          <label htmlFor="regularPrice" className="block font-medium mb-1">
            Regular price
          </label>
          <input
            type="number"
            id="regularPrice"
            placeholder="Regular price"
            {...register('regularPrice', {
              required: 'This field is required',
              min: { value: 1, message: 'Price must be at least 1 euro' },
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
          />
          {errors?.regularPrice && (
            <span className="text-[1.4rem] text-red-700">{errors.regularPrice.message}</span>
          )}
        </div>

        {/* Discount */}
        <div>
          <label htmlFor="discount" className="block font-medium mb-1">
            Discount
          </label>
          <input
            type="number"
            id="discount"
            defaultValue={0}
            placeholder="Discount"
            {...register('discount', {
              required: 'This field is required',
              min: { value: 0, message: 'Discount cannot be negative' },
              validate: (value) =>
                Number(value) < Number(regularPrice) || 'Discount must be lower than regular price',
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
          />
          {errors?.discount && (
            <span className="text-[1.4rem] text-red-700">{errors.discount.message}</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description for website
          </label>
          <textarea
            id="description"
            defaultValue=""
            placeholder="Description for website"
            {...register('description', { required: 'This field is required' })}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
          />
          {errors?.description && (
            <span className="text-[1.4rem] text-red-700">{errors.description.message}</span>
          )}
        </div>

        {/* Cabin Photo */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Cabin photo
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register('image', {
              required: 'This image is required',
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500"
          />
          {errors?.image && (
            <span className="text-[1.4rem] text-red-700">{errors.image.message}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <ButtonForLoading text="Create cabin" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
}

export default CreateCabinForm;
