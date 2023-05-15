import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

function getAuthUsername() {
  const cookie = Cookies.get('jwt');
  if (cookie) {
    const { username } = jwt_decode(cookie);
    console.log('coockie: ', username);
    if (username) return username.toLowerCase();
    return null;
  }
  return null;
}

function removeCoockie(cookieName = 'jwt') {
  Cookies.remove(cookieName);
}

export { getAuthUsername, removeCoockie };
