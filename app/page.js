import Image from 'next/image';
import Link from 'next/link';
import bg_pic from '@/public/bg.png';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Wild Oasis</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Wild Oasis" />
        <meta
          property="og:description"
          content="Not just a hotel, but your perfect escape for a peaceful vacation."
        />
        <meta
          property="og:url"
          content="https://the-wild-oasis-website-artem-orlovs-projects.vercel.app/"
        />
      </Head>
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
    </>
  );
}
