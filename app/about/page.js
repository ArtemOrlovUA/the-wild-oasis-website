import Link from 'next/link';

export const metadata = {
  title: 'About us',
};

export default function Cabins() {
  return (
    <>
      <h1>About us</h1>
      <Link href="/">Go to main page</Link>
    </>
  );
}
