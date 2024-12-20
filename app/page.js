import Image from 'next/image';
import Link from 'next/link';
import bg_pic from '@/public/bg.png';

export default function Home() {
  return (
    <main className="">
      <Image
        src={bg_pic}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl my-4 text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all">
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
