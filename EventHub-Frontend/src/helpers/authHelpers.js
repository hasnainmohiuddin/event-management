export const setUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  window.location.reload();
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};
