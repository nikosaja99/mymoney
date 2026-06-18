
let filterMode = "hari";
let filterTanggal = null;
let filterBulan = null;

function loadRiwayat() {

  const transaksi = getData("mymoney_transaksi") || [];

  const list = document.getElementById("listRiwayat");

  const hariIni = transaksi.filter(item => isHariIni(item.tanggal));

  list.innerHTML = "";

  hariIni.slice().reverse().forEach(item => {

    const warna = item.jenis === "masuk"
      ? "text-emerald-600"
      : "text-red-500";

    const prefix = item.jenis === "masuk" ? "+" : "-";

    list.innerHTML += `
      <div class="bg-white p-4 rounded-2xl shadow flex justify-between items-center">

        <div>
          <p class="font-semibold">${item.judul}</p>
          <p class="text-xs text-slate-400 capitalize">${item.jenis}</p>
        </div>

        <div class="${warna} font-bold">
          ${prefix} ${formatRupiah(item.jumlah)}
        </div>

      </div>
    `;
  });
}
function isHariIni(tanggal) {
  if (!tanggal) return false;

  const t = new Date(tanggal);
  const now = new Date();

  return (
    t.getDate() === now.getDate() &&
    t.getMonth() === now.getMonth() &&
    t.getFullYear() === now.getFullYear()
  );
}

function isBulanIni(tanggal, bulan) {
  const t = new Date(tanggal);

  return (
    t.getFullYear() === bulan.getFullYear() &&
    t.getMonth() === bulan.getMonth()
  );
}

function isBulanIni(tanggal, bulan) {
  const t = new Date(tanggal);

  return (
    t.getFullYear() === bulan.getFullYear() &&
    t.getMonth() === bulan.getMonth()
  );
}

function setFilterBulan() {
  const value = document.getElementById("filterBulan").value;

  if (!value) return;

  filterBulan = new Date(value + "-01");
  filterMode = "bulan";

  renderRiwayat();
}

function renderRiwayat() {

  const transaksi = getData("mymoney_transaksi") || [];
  const list = document.getElementById("listRiwayat");

  let data = [...transaksi];

  // FILTER LOGIC
  if (filterMode === "hari") {
    data = data.filter(item => isHariIni(item.tanggal));
  }

  if (filterMode === "tanggal" && filterTanggal) {
    data = data.filter(item => {
      const t = new Date(item.tanggal);
      const f = new Date(filterTanggal);

      return (
        t.getDate() === f.getDate() &&
        t.getMonth() === f.getMonth() &&
        t.getFullYear() === f.getFullYear()
      );
    });
  }

  if (filterMode === "bulan" && filterBulan) {
    data = data.filter(item =>
      isBulanIni(item.tanggal, filterBulan)
    );
  }

  list.innerHTML = "";

  let totalMasuk = 0;
  let totalKeluar = 0;

  data.slice().reverse().forEach(item => {

    if (item.jenis === "masuk") totalMasuk += item.jumlah;
    else totalKeluar += item.jumlah;

    const warna = item.jenis === "masuk"
      ? "text-emerald-600"
      : "text-red-500";

    const prefix = item.jenis === "masuk" ? "+" : "-";

    list.innerHTML += `
      <div class="bg-white p-4 rounded-2xl shadow flex justify-between items-center">

        <div>
          <p class="font-semibold">${item.judul || "-"}</p>
          <p class="text-xs text-slate-400 capitalize">${item.jenis}</p>
        </div>

        <div class="${warna} font-bold">
          ${prefix} ${formatRupiah(item.jumlah)}
        </div>

      </div>
    `;
  });

  updateSummary(totalMasuk, totalKeluar);
}

document.addEventListener("DOMContentLoaded", () => {
  loadRiwayat();
});