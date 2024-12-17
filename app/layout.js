import Logo from './components/Logo';
import NavBar from './components/NavBar';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Logo />
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
