import { getCabins } from '../_lib/data-service';
import CabinCard from './CabinCard';

async function CabinList({ filter }) {
  const cabins = await getCabins();

  let filteredCabins;

  if (filter === 'all') filteredCabins = cabins;
  if (filter === 'small') filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 2);
  if (filter === 'medium')
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 3 && cabin.maxCapacity <= 6);
  if (filter === 'large') filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 7);

  return (
    <>
      {cabins.length > 0 ? (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {filteredCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      ) : (
        <p className="text-primary-200 text-lg">
          No cabins available at the moment. Please check back later.
        </p>
      )}
    </>
  );
}

export default CabinList;
