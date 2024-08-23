export const usersBySite = {};

export const addUser = (siteId) => {
  if (!usersBySite[siteId]) {
    usersBySite[siteId] = 0;
  }
  usersBySite[siteId]++;
};

export const removeUser = (siteId) => {
  if (usersBySite[siteId]) {
    usersBySite[siteId]--;
    if (usersBySite[siteId] === 0) {
      delete usersBySite[siteId];
    }
  }
};

export const getUserCount = (siteId) => {
  return usersBySite[siteId] || 0;
};
