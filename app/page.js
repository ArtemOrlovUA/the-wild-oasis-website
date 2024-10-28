import Image from 'next/image';
import Link from 'next/link';
import NavBar from './components/NavBar';

export default function Home() {
  return (
    <div>
      <NavBar />
      <Link href="/about">Read about us</Link>
    </div>
  );
}
