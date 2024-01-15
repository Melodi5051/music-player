import { Outlet } from 'react-router'
import { Header } from '~/widgets/Header'
import { Footer } from '~/widgets/Footer'

export function Layout() {
  return (
    <>
      <Header />
      <main className="flex flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
