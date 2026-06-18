function hitungHariTersisa(tanggal) {
  if (!tanggal) return 0;

  const hariIni = new Date();
  const danaMasuk = new Date(tanggal);

  const selisih = danaMasuk - hariIni;

  return Math.ceil(selisih / (1000 * 60 * 60 * 24));
}

function hitungBatasAman(profile) {
  if (!profile) return 0;

  const hari = hitungHariTersisa(profile.tanggalDanaBerikutnya);

  if (hari <= 0) return profile.saldoSaatIni;

  return Math.floor(profile.saldoSaatIni / hari);
}
function formatRupiah(angka) {
  if (isNaN(angka)) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(angka);
}

function renderDashboard() {
  const profile = getData("mymoney_profile");

  if (!profile) return;

  document.getElementById("namaUser").textContent =
    profile.nama || "-";

  document.getElementById("saldo").textContent =
    formatRupiah(profile.saldoSaatIni);

  document.getElementById("batasAman").textContent =
    formatRupiah(hitungBatasAman(profile)) + "/hari";

  document.getElementById("hariTersisa").textContent =
    hitungHariTersisa(profile.tanggalDanaBerikutnya) + " Hari Lagi";

  document.getElementById("jumlahDanaBerikutnya").textContent =
    formatRupiah(profile.jumlahDanaBerikutnya);
}


document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
});