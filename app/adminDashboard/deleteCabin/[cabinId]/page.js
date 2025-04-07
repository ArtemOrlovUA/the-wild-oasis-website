'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCabin } from '@/app/_lib/data-service-admin';

import ButtonForLoading from '@/app/_components/ButtonForLoading';
import Spinner from '@/app/_components/Spinner';
import { deleteCabin } from '@/app/_lib/actions';

export default function DeleteCabinForm({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      cabinId: params.cabinId,
      name: '',
    },
  });

  const cabinName = watch('name');

  useEffect(() => {
    async function loadCabin() {
      try {
        setIsLoading(true);
        const cabin = await getCabin(params.cabinId);

        if (cabin) {
          setValue('name', cabin.name);
          setValue('cabinId', cabin.id);
        } else {
          toast.error('Cabin not found');
          router.push('/adminDashboard');
        }
      } catch (error) {
        toast.error('An error occurred while fetching the cabin data');
        console.error(error);
        router.push('/adminDashboard');
      } finally {
        setIsLoading(false);
      }
    }
    loadCabin();
  }, [params.cabinId, setValue, router]);

  const onSubmit = async (data) => {
    try {
      await deleteCabin(params.cabinId);
      toast.success(`Cabin "${data.name}" has been deleted`);
      router.push('/adminDashboard');
    } catch (error) {
      toast.error('Failed to delete cabin: cabin may be already booked');
      console.error(error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-6">
      <h1 className="text-xl font-bold mb-6">
        Are you sure you want to delete cabin with name: {cabinName}?
      </h1>

      <div className="flex justify-between items-center gap-x-[3rem]">
        <Link href="/adminDashboard" className="mr-4 hover:underline">
          Cancel (back to Admin&apos;s dashboard)
        </Link>
        <ButtonForLoading
          type="submit"
          text={'Delete cabin'}
          isLoading={isSubmitting}
          disabled={isLoading || isSubmitting}
          className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"></ButtonForLoading>
      </div>
    </form>
  );
}
