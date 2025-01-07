'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter({ filter }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilterClick(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border-t py-4 text-xl border-primary-800 flex justify-end">
      <button
        className={`px-5 py-2 hover:bg-primary-600 ${filter === 'all' && 'bg-primary-600'}`}
        onClick={() => handleFilterClick('all')}>
        All cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-600 ${filter === 'small' ? 'bg-primary-600' : ''}`}
        onClick={() => handleFilterClick('small')}>
        Small (2 or less people)
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-600 ${filter === 'medium' && 'bg-primary-600'}`}
        onClick={() => handleFilterClick('medium')}>
        Medium (from 3 to 6 people)
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-600 ${filter === 'large' && 'bg-primary-600'}`}
        onClick={() => handleFilterClick('large')}>
        Large (7 and more people){' '}
      </button>
    </div>
  );
}

export default Filter;
