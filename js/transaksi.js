function tambahTransaksi(data) {
  const transaksi = getData("mymoney_transaksi") || [];

  transaksi.push({
    id: Date.now(),
    ...data,
    tanggal: new Date().toISOString()
  });

  saveData("mymoney_transaksi", transaksi);
}

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(angka);
}

function toggleKategori() {
  const jenis = document.getElementById("jenis").value;
  const wrapper = document.getElementById("kategoriWrapper");

  if (jenis === "keluar") {
    wrapper.classList.remove("hidden");
  } else {
    wrapper.classList.add("hidden");
  }
}


function submitTransaksi() {

  const judul = document.getElementById("judul").value;
  const jenis = document.getElementById("jenis").value;
  const jumlah = Number(document.getElementById("jumlah").value);

  let kategori = null;

  if (jenis === "keluar") {
    kategori = document.getElementById("kategori").value;
  }

  if (!judul || !jumlah) return;

  tambahTransaksi({
    judul,
    jenis,
    jumlah,
    kategori
  });

  document.getElementById("judul").value = "";
  document.getElementById("jumlah").value = "";

  renderTransaksi();
}


function renderTransaksi() {
  const list = document.getElementById("listTransaksi");
  const data = getData("mymoney_transaksi") || [];

  list.innerHTML = "";

  data.slice().reverse().forEach(item => {

    const isMasuk = item.jenis === "masuk";

    const warna = isMasuk
      ? "text-emerald-600"
      : "text-red-500";

    const prefix = isMasuk ? "+" : "-";

    list.innerHTML += `
      <div class="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center">

        <div>
          <p class="font-semibold text-slate-800">${item.judul}</p>
          <p class="text-xs text-slate-400 capitalize">${item.jenis}</p>
        </div>

        <div class="${warna} font-bold">
          ${prefix} ${formatRupiah(item.jumlah)}
        </div>

      </div>
    `;
  });
}
document.addEventListener("DOMContentLoaded", () => {
  renderTransaksi();
  toggleKategori();

  document.getElementById("jenis")
    .addEventListener("change", toggleKategori);
});