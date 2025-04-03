'use client';

import { supabasePublic } from '../_lib/supabaseAdmin';

export async function getCurrentUser() {
  const { data, error } = await supabasePublic.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

function page() {
  async function getUser() {
    const user = await getCurrentUser();
    console.log(user);
  }

  return (
    <div>
      <button
        onClick={() => getUser()}
        className="bg-accent-500 px-8 py-3 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all">
        Get current user
      </button>
    </div>
  );
}

export default page;
