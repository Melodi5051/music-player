import { Outlet } from 'react-router'
import { Header } from '~/widgets/Header'
import { Footer } from '~/widgets/Footer'

export function Layout() {
  return (
    <div className="flex flex-col flex-1 dark:bg-black">
      <Header />
      <main className="flex flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
