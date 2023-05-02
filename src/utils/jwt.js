import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

function isLoggedIn() {
  const jwtcookie = Cookies.get('jwt');
  console.log('login: ', jwtcookie);
  if (jwtcookie) return true;
  return false;
}

function getLogedInUsername() {
  const cookie = Cookies.get('jwt');
  if (cookie) {
    const { username } = jwt_decode(cookie);
    console.log(username);
    if (username) return username;
  }
  return null;
}

function removeCoockie(cookieName = 'jwt') {
  Cookies.remove(cookieName);
}

export { isLoggedIn, getLogedInUsername, removeCoockie };
