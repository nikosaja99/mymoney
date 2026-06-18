function simpanProfil() {

  const profile = {
    nama: document.getElementById("nama").value,
    profesi: document.getElementById("profesi").value,
    sumberDana: document.getElementById("sumberDana").value,
    tanggalDanaBerikutnya: document.getElementById("tanggalDana").value,
    jumlahDanaBerikutnya: Number(document.getElementById("jumlahDana").value),
    saldoSaatIni: Number(document.getElementById("saldo").value),
    jamNotifikasi: document.getElementById("jamNotifikasi").value
  };

  localStorage.setItem(
    "mymoney_profile",
    JSON.stringify(profile)
  );

  window.location.href = "dashboard.html";
}