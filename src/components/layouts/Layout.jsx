import { Outlet } from 'react-router-dom';
import MenuAppBar from './AppBar';

function Layout() {
  return (
    <>
      <MenuAppBar />
      <Outlet />
    </>
  );
}
export default Layout;
