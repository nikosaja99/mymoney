// ==========================================
// Pengecekan Awal Saat Halaman Dimuat
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const profilAda = localStorage.getItem("mymoney_profile");
  
  // Jika pengguna SEBENARNYA SUDAH PUNYA PROFIL, langsung lempar ke dashboard
  if (profilAda) {
    window.location.href = "dashboard.html";
    return;
  }

  // Memastikan saat pertama kali dimuat, hanya welcomeScreen yang tampil
  const welcomeScreen = document.getElementById("welcomeScreen");
  const formScreen = document.getElementById("formScreen");

  if (welcomeScreen && formScreen) {
    welcomeScreen.classList.remove("hidden");
    formScreen.classList.add("hidden");
  }
});

// ==========================================
// Fungsi Menyimpan Profil (Sudah Diperbaiki)
// ==========================================
function simpanProfil() {
  // 1. Ambil semua elemen input
  const namaInput = document.getElementById("nama");
  const profesiInput = document.getElementById("profesi");
  const sumberDanaInput = document.getElementById("sumberDana");
  const tanggalDanaInput = document.getElementById("tanggalDana");
  const jumlahDanaInput = document.getElementById("jumlahDana");
  const saldoInput = document.getElementById("saldo");
  const jamNotifikasiInput = document.getElementById("jamNotifikasi");

  // 2. Validasi: Mencegah data kosong (Basic Validation)
  if (
    !namaInput.value.trim() || 
    !profesiInput.value || 
    !sumberDanaInput.value || 
    !tanggalDanaInput.value || 
    !jumlahDanaInput.value || 
    !saldoInput.value || 
    !jamNotifikasiInput.value
  ) {
    alert("Harap lengkapi semua data profil terlebih dahulu, ya! 😊");
    return; // Berhentikan fungsi jika ada yang kosong
  }

  // 3. Buat Object Profile
  const profile = {
    nama: namaInput.value.trim(),
    profesi: profesiInput.value,
    sumberDana: sumberDanaInput.value,
    tanggalDanaBerikutnya: tanggalDanaInput.value,
    jumlahDanaBerikutnya: Number(jumlahDanaInput.value),
    saldoSaatIni: Number(saldoInput.value),
    jamNotifikasi: jamNotifikasiInput.value
  };

  // 4. Simpan ke LocalStorage
  localStorage.setItem("mymoney_profile", JSON.stringify(profile));

  // 5. Redirect ke halaman utama
  window.location.href = "dashboard.html";
}
