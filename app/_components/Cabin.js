import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import TextExpander from './TextExpander';
import Image from 'next/image';

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  return (
    <div className="md:grid grid-cols-[3fr_4fr] flex flex-col gap-20 border border-primary-800 py-10 px-10 mb-16">
      <div className="relative flex justify-center items-center aspect-square">
        <Image src={image} fill className="object-cover  justify-center" alt={`Cabin ${name}`} />
      </div>

      <div>
        <h3 className="text-accent-100 font-black md:text-6xl text-xl mb-2 bg-primary-950 md:py-6 pb-1 w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-2">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 pb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
