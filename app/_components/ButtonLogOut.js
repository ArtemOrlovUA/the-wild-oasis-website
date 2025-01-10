'use client';

import Link from 'next/link';

function ButtonLogOut() {
  return (
    <Link href={'/api/auth/signout'} className="hover:text-accent-400 transition-colors">
      Sign out
    </Link>
  );
}

export default ButtonLogOut;
