import { getCabin, getCabins } from '@/app/_lib/data-service';
import { Suspense } from 'react';

import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);

  return {
    title: `Cabin ${cabin.name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-2">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl mb-16 font-semibold text-center">
          Reserve Cabin {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
