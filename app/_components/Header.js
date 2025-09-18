import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';
import { auth } from '@/app/_lib/auth';
import { getGuest } from '../_lib/data-service';

export default async function Header() {
  const session = await auth();
  const guest = await getGuest(session?.user?.email);

  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation session={session} guest={guest} />
      </div>
    </header>
  );
}
