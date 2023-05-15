import { useRouteError } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { removeCoockie } from '../../utils/jwt';

export default function ErrorPage() {
  const error = useRouteError();
  const { setAuthUser, setIsLoggedIn } = useAuth();

  if (error.message.includes('jwt expired')) {
    setAuthUser(null);
    setIsLoggedIn(false);
    removeCoockie('jwt');
  }
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
