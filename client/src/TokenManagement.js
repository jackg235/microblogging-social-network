import decode from 'jwt-decode';

class TokenManagement {

  isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      return (decoded.exp < Date.now() / 1000);
    } catch (err) {
      console.log(`Authentication failed: ${err}`)
      return false;
    }
  }

  loggedIn = () => {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  setToken = (token) => {
    localStorage.setItem('user_token', token);
  }

  getConfirm = () => {
    let answer = decode(this.getToken());
    return answer;
  };

  getUser = () => {
    return this.getConfirm().context.user
  }

  getToken = () => {
    return localStorage.getItem('user_token');
  }

  removeToken = () => {
    localStorage.removeItem('user_token');
  }
}

export default new TokenManagement()