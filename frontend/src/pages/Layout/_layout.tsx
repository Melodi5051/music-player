import { Outlet } from 'react-router';
import './_layout.scss';
import { Header } from '~/widgets/Header';
import { Footer } from '~/widgets/Footer';

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
