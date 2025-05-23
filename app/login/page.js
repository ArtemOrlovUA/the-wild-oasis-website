import SignInButton from '../_components/SignInButton';

export const metadata = {
  title: 'Log in',
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to reserve the cabin and access your guest area
      </h2>

      <SignInButton />
    </div>
  );
}
