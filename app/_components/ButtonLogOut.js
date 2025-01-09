'use client';

import Link from 'next/link';
import { signOut } from '../_lib/auth'; // Ensure this path is correct and the function is properly exported from the module

function ButtonLogOut() {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Link href={'/api/auth/signout'} className="hover:text-accent-400 transition-colors">
      Sign out
    </Link>
  );
}

export default ButtonLogOut;
