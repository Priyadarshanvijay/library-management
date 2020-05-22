import * as jwt from 'jsonwebtoken';

export async function isAdminLoggedIn() {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return false;
    }
    const admin = await jwt.verify(token, process.env.REACT_APP_SECRET);
    if (typeof admin.global === 'undefined') {
      return false;
    }
    if (!admin.global) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }

};

export async function isUserLoggedIn() {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return false;
    }
    const user = await jwt.verify(token, process.env.REACT_APP_SECRET);
    if (!user) {
      return false;
    }
    if (typeof user.global !== 'undefined') {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}