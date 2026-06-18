function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(angka);
}


function tambahTarget() {

  const nama = document.getElementById("nama").value;
  const target = Number(document.getElementById("target").value);
  const terkumpul = Number(document.getElementById("terkumpul").value);
  const tanggalTarget = document.getElementById("tanggal").value;

  if (!nama || !target) return;

  const data = getData("mymoney_target") || [];

  data.push({
    id: Date.now(),
    nama,
    target,
    terkumpul,
    tanggalTarget
  });

  saveData("mymoney_target", data);

  renderTarget();
}


function hitungBulan(tanggal) {
  const now = new Date();
  const target = new Date(tanggal);

  const diff =
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth());

  return diff > 0 ? diff : 1;
}


function renderTarget() {

  const data = getData("mymoney_target") || [];
  const list = document.getElementById("listTarget");

  list.innerHTML = "";

  data.forEach(item => {

    const sisa = item.target - item.terkumpul;
    const bulan = hitungBulan(item.tanggalTarget);
    const perBulan = sisa / bulan;

    const persen = Math.min(
      100,
      Math.round((item.terkumpul / item.target) * 100)
    );

    list.innerHTML += `
      <div class="bg-white p-4 rounded-2xl shadow">

        <div class="flex justify-between">
          <h2 class="font-bold">${item.nama}</h2>
          <span>${persen}%</span>
        </div>

        <div class="w-full bg-slate-100 h-2 rounded-full mt-2">
          <div class="h-2 bg-blue-500" style="width:${persen}%"></div>
        </div>

        <p class="text-sm mt-2">
          Target: ${formatRupiah(item.target)}
        </p>

        <p class="text-sm">
          Terkumpul: ${formatRupiah(item.terkumpul)}
        </p>

        <p class="text-sm text-red-500 font-medium mt-2">
          Sisa: ${formatRupiah(sisa)}
        </p>

        <p class="text-sm text-blue-600 font-semibold">
          Per bulan: ${formatRupiah(perBulan)}
        </p>

      </div>
    `;
  });
}


document.addEventListener("DOMContentLoaded", () => {
  renderTarget();
});