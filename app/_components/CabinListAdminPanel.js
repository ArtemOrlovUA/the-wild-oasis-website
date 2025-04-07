'use client';

import Link from 'next/link';
import CabinCard from './CabinCard';

export default function CabinList({ cabins }) {
  return (
    <div className="flex flex-col space-y-6">
      {cabins.map((cabin) => (
        <div
          key={cabin.id}
          className="flex items-center justify-between bg-primary-800 rounded-lg shadow p-4">
          <div className="flex-1">
            <CabinCard cabin={cabin} />
          </div>

          <div className="flex flex-col space-y-4 ml-6">
            <Link
              href={`/adminDashboard/${cabin.id}`}
              className="px-4 py-2 bg-blue-600 text-center text-white hover:bg-blue-700 transition">
              Edit
            </Link>
            <Link
              href={`/adminDashboard/deleteCabin/${cabin.id}`}
              className="px-4 py-2 bg-red-600 text-white text-center hover:bg-red-700 transition">
              Delete
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
