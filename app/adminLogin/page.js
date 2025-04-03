'use client';

import { useState } from 'react';
import { supabasePublic } from '../_lib/supabaseAdmin';
import toast from 'react-hot-toast';

export async function signInAdmin({ email, password }) {
  const { data, error } = await supabasePublic.auth.signInWithPassword({ email, password });
  if (error) {
    console.error(error.message);
    return { error };
  }
  console.log(data);
  return data;
}

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let user;

  async function handleLogin() {
    const data = await signInAdmin({ email, password });
    !data?.user && toast.error('Login failed: please check your credentials');
    // const user = await getCurrentUser();
    // console.log(user);
  }

  return (
    <div className="flex flex-col items-center gap-y-4 text-[2rem]">
      <h1>Please, log in to access admin page</h1>

      <div className="flex flex-col w-[30rem] text-black gap-y-4">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please, enter your email"></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Please, enter your password"></input>
      </div>

      <button
        onClick={() => handleLogin()}
        className="bg-accent-500 px-8 py-3 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all">
        Log in
      </button>
    </div>
  );
}

export default Page;
