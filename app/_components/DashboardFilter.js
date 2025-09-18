'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function DashboardFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const current = searchParams.get('last') || '7';

  function setFilter(value) {
    const params = new URLSearchParams(searchParams);
    params.set('last', value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const base = 'px-3 py-1 rounded-md text-sm font-medium border transition-colors duration-150';
  const active = 'bg-accent-500 text-primary-900 border-accent-500';
  const inactive = 'bg-primary-700 text-primary-100 border-primary-600 hover:bg-primary-600';

  return (
    <div className="gap-2 flex items-center">
      <p className="text-primary-100">Select range of dates:</p>
      {[
        { value: '7', label: 'Last 7 days' },
        { value: '30', label: 'Last 30 days' },
        { value: '90', label: 'Last 90 days' },
      ].map((opt) => (
        <button
          key={opt.value}
          type="button"
          disabled={current === opt.value}
          className={`${base} ${current === opt.value ? active : inactive}`}
          onClick={() => setFilter(opt.value)}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default DashboardFilter;
