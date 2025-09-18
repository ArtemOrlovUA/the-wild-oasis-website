'use client';

import { useFormStatus } from 'react-dom';

function ButtonForLoading({ text, isLoading, isFunctional = true }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={isLoading || !isFunctional}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {isLoading || pending ? 'Loading...' : text}
    </button>
  );
}

export default ButtonForLoading;
