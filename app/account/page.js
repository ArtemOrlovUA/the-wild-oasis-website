import { auth } from '../_lib/auth';

export const metadata = {
  title: 'Account',
};

export default async function Page() {
  const session = await auth();

  return (
    <h1 className="text-4xl mb-5 text-accent-400 font-medium">Welcome, {session?.user?.name} </h1>
  );
}
