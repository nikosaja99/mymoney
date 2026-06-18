function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(angka);
}

function renderAnalisis() {

  const data = getData("mymoney_transaksi") || [];

  const pengeluaran = data.filter(item => item.jenis === "keluar");

  let totalKeluar = 0;

  const kategoriMap = {};

  pengeluaran.forEach(item => {

    totalKeluar += item.jumlah;

    const kategori = item.kategori || "lainnya";

    if (!kategoriMap[kategori]) {
      kategoriMap[kategori] = 0;
    }

    kategoriMap[kategori] += item.jumlah;
  });

  document.getElementById("totalKeluar").textContent =
    formatRupiah(totalKeluar);

  const list = document.getElementById("listKategori");
  list.innerHTML = "";

  Object.keys(kategoriMap).forEach(kat => {

    const jumlah = kategoriMap[kat];

    const persen = totalKeluar > 0
      ? Math.round((jumlah / totalKeluar) * 100)
      : 0;

    list.innerHTML += `
      <div class="bg-white p-4 rounded-2xl shadow">

        <div class="flex justify-between">
          <p class="font-semibold capitalize">${kat}</p>
          <p class="text-sm text-slate-500">${persen}%</p>
        </div>

        <div class="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
          <div class="h-2 bg-blue-500" style="width:${persen}%"></div>
        </div>

        <p class="text-sm mt-2 font-medium text-slate-700">
          ${formatRupiah(jumlah)}
        </p>

      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderAnalisis();
});