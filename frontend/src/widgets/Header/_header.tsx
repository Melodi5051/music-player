import logo from './../../../public/logo.png'

export function Header() {
  return (
    <header className="w-full flex items-center p-2">
      <img className="w-[150px]" src={logo} alt="logo" />
    </header>
  )
}
