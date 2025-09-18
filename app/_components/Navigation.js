'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation({ session, guest }) {
  const pathname = usePathname();

  const isAdminDashboard = pathname?.startsWith('/adminDashboard');
  const isAdminLogIn = pathname?.startsWith('/adminLogin');

  const isAdminRoute = isAdminDashboard || isAdminLogIn;

  return (
    <nav className="z-10 text-xl text-primary-50">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="/account" className="hover:text-accent-400 transition-colors">
            Guest area
          </Link>
        </li>
        {!isAdminRoute &&
          (session ? (
            <li className="flex items-center gap-2">
              <p className="hover:text-accent-400 transition-colors">
                Currently logged as: {guest?.fullName || session.user.email}
              </p>
              <Image
                src={session?.user?.image}
                alt="User profile image"
                width={40}
                height={40}
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
            </li>
          ) : (
            <Link className="hover:text-accent-400 transition-colors" href={'/login'}>
              Log in
            </Link>
          ))}
      </ul>
    </nav>
  );
}
