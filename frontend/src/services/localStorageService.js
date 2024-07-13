const storeData = data => {
  localStorage.setItem(
    'clinicUserData',
    JSON.stringify({
      isAuthenticated: true,
      userId: data,
    })
  );
};

const getData = () => {
  return JSON.parse(localStorage.getItem('clinicUserData'));
};

const clearData = () => {
  localStorage.removeItem('clinicUserData');
};

export const localStorageService = {
  storeData,
  getData,
  clearData,
};
