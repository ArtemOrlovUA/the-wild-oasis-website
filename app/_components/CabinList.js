import { getCabins } from '../_lib/data-service';
import CabinCard from './CabinCard';

async function CabinList() {
  const cabins = await getCabins();

  return (
    <>
      {cabins.length > 0 ? (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
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
