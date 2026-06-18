const STORAGE_KEYS = {
  PROFILE: "mymoney_profile",
  TRANSAKSI: "mymoney_transaksi",
  TARGET: "mymoney_target"
};

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getData(key, defaultValue = null) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

function removeData(key) {
  localStorage.removeItem(key);
}

function initStorage() {
  if (!getData(STORAGE_KEYS.TRANSAKSI)) {
    saveData(STORAGE_KEYS.TRANSAKSI, []);
  }

  if (!getData(STORAGE_KEYS.PROFILE)) {
    saveData(STORAGE_KEYS.PROFILE, null);
  }

  if (!getData(STORAGE_KEYS.TARGET)) {
    saveData(STORAGE_KEYS.TARGET, []);
  }
}