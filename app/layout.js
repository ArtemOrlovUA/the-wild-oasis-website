import '@/app/_styles/globals.css';
import { Josefin_Sans } from 'next/font/google';
import Header from './_components/Header';
import { ReservationProvider } from './_components/ReservationContext';
import { Toaster } from 'react-hot-toast';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s - The Wild Oasis',
    default: 'The Wild Oasis',
  },
  description:
    'Luxury hotel in the heart of the forest, with a view of the mountains. Located in Italy.',
  openGraph: {
    title: 'The Wild Oasis',
    description:
      'Luxury hotel in the heart of the forest, with a view of the mountains. Located in Italy.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased`}>
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full overflow-x-hidden">
            <Toaster />
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
