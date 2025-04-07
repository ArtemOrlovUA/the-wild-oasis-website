'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { editCabin, getCabin } from '@/app/_lib/data-service-admin';

import ButtonForLoading from '@/app/_components/ButtonForLoading';

export default function EditCabinForm({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [cabin, setCabin] = useState(null);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      maxCapacity: '',
      regularPrice: '',
      discount: '',
      description: '',
    },
  });

  useEffect(() => {
    async function init() {
      const cabin = await getCabin(params.cabinId);
      if (cabin) {
        setCabin(cabin);
        reset({
          name: cabin.name,
          maxCapacity: cabin.maxCapacity,
          regularPrice: cabin.regularPrice,
          discount: cabin.discount,
          description: cabin.description,
        });
      }
    }
    init();
  }, [params.cabinId, reset]);

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const image = data.image?.[0] ?? cabin.image;
      await editCabin(cabin.id, {
        name: data.name,
        maxCapacity: Number(data.maxCapacity),
        regularPrice: Number(data.regularPrice),
        discount: Number(data.discount),
        description: data.description,
        image,
      });
      toast.success('Cabin updated successfully!');
      router.push('/adminDashboard');
    } catch (err) {
      toast.error(err.message || 'Error updating the cabin');
    } finally {
      setIsLoading(false);
    }
  }

  const regularPrice = watch('regularPrice');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-[60rem] p-6 rounded-lg shadow mx-auto">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Cabin name
        </label>
        <input
          id="name"
          {...register('name', { required: 'This field is required' })}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
        />
        {errors.name && <p className="text-red-700 mt-1">{errors.name.message}</p>}
      </div>

      {/* Max Capacity */}
      <div>
        <label htmlFor="maxCapacity" className="block font-medium mb-1">
          Maximum capacity
        </label>
        <input
          id="maxCapacity"
          type="number"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'At least one guest' },
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
        />
        {errors.maxCapacity && <p className="text-red-700 mt-1">{errors.maxCapacity.message}</p>}
      </div>

      {/* Regular Price */}
      <div>
        <label htmlFor="regularPrice" className="block font-medium mb-1">
          Regular price
        </label>
        <input
          id="regularPrice"
          type="number"
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Price must be at least 1' },
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
        />
        {errors.regularPrice && <p className="text-red-700 mt-1">{errors.regularPrice.message}</p>}
      </div>

      {/* Discount */}
      <div>
        <label htmlFor="discount" className="block font-medium mb-1">
          Discount
        </label>
        <input
          id="discount"
          type="number"
          {...register('discount', {
            required: 'This field is required',
            min: { value: 0, message: 'Cannot be negative' },
            validate: (value) =>
              Number(value) < Number(regularPrice) || 'Discount must be lower than regular price',
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
        />
        {errors.discount && <p className="text-red-700 mt-1">{errors.discount.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description', {
            required: 'This field is required',
          })}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500 text-black"
        />
        {errors.description && <p className="text-red-700 mt-1">{errors.description.message}</p>}
      </div>

      {/* Image */}
      <div>
        <label htmlFor="image" className="block font-medium mb-1">
          Cabin photo
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          {...register('image')}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-accent-500"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-between items-center">
        <Link href="/adminDashboard" className="mr-4 hover:underline">
          Cancel (back to Admin&apos;s dashboard)
        </Link>
        <ButtonForLoading text="Update cabin" isLoading={isLoading} />
      </div>
    </form>
  );
}
