import logo from '~/../public/logo.png';
import './_header.scss';
export function Header() {
  return (
    <header>
      <img width={150} src={logo} alt="logo" />
    </header>
  );
}
