'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signInAdmin } from '../_lib/data-service-admin';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function checkIsAuth() {
      const user = await getCurrentUser();
      if (user) {
        console.log('user');
        router.push('/adminDashboard');
      }
    }
    checkIsAuth();
  }, [router]);

  async function handleLogin() {
    const data = await signInAdmin({ email, password });
    if (!data?.user) {
      toast.error('Login failed: please check your credentials');
    } else {
      toast.success('Login successful!');
      router.push('/adminDashboard');
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-4 text-[2rem]">
      <h1>Please, log in to access admin page</h1>

      <div className="flex flex-col w-[30rem] text-black gap-y-4">
        <input
          type="text"
          value={email}
          className="focus:outline-none border-2 focus:border-accent-500 transition-all text-[1.5rem] rounded-[20px] p-2"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please, enter your email"></input>
        <input
          type="password"
          value={password}
          className="focus:outline-none border-2 focus:border-accent-500 transition-all text-[1.5rem] rounded-[20px] p-2"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Please, enter your password"></input>
      </div>

      <button
        onClick={() => handleLogin()}
        className="bg-accent-500 px-8 py-3 rounded-[20px] text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all duration-200">
        Log in
      </button>
    </div>
  );
}

export default Page;
