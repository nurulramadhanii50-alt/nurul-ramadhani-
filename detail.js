// =========================================================
// DATA DESTINASI
// Ubah / tambah isi di sini; halaman detail.html otomatis menyesuaikan.
// =========================================================
const DESTINASI = {
    dato: {
        nama: "Pantai Dato",
        kabupaten: "Majene",
        lokasi: "Majene, Sulawesi Barat",
        ringkas: "Salah satu destinasi wisata pesisir di Kabupaten Majene.",
        deskripsi:
            "Pantai Dato merupakan salah satu tempat wisata yang dikenal di Kabupaten Majene, " +
            "Sulawesi Barat. Pantai ini menawarkan pemandangan laut dan tebing yang menarik " +
            "untuk dinikmati pengunjung.",
        dayaTarik: [
            "Pemandangan laut yang indah.",
            "Area pantai dan tebing yang menarik.",
            "Tempat menikmati suasana pesisir.",
            "Kesempatan mengambil foto pemandangan."
        ],
        foto: "gambar/pantai-dato.jpg",
        mini: "gambar/pantai-dato-udara.jpg",
        alt: "Pemandangan Pantai Dato di Majene"
    },
    barane: {
        nama: "Pantai Barane",
        kabupaten: "Majene",
        lokasi: "Majene, Sulawesi Barat",
        ringkas: "Pilihan wisata pantai di Kabupaten Majene.",
        deskripsi:
            "Pantai Barane merupakan pilihan wisata pantai untuk menikmati pemandangan " +
            "pesisir dan suasana laut yang menenangkan.",
        dayaTarik: [
            "Pemandangan pesisir yang menarik.",
            "Suasana laut yang menenangkan.",
            "Tempat bersantai di tepi pantai.",
            "Kesempatan mengambil foto pemandangan."
        ],
        foto: "gambar/pantai-barane.jpg",
        mini: "gambar/pantai-barane.jpg",
        alt: "Pemandangan Pantai Barane di Majene"
    },
    manakarra: {
        nama: "Anjungan Manakarra",
        kabupaten: "Mamuju",
        lokasi: "Mamuju, Sulawesi Barat",
        ringkas: "Salah satu tempat yang dikenal di Mamuju untuk menikmati kawasan pesisir kota.",
        deskripsi:
            "Anjungan Manakarra adalah salah satu tempat yang dikenal di Mamuju untuk " +
            "menikmati suasana kawasan pesisir kota.",
        dayaTarik: [
            "Suasana kawasan pesisir kota Mamuju.",
            "Tempat menikmati pemandangan pesisir.",
            "Kesempatan mengambil foto pemandangan."
        ],
        foto: "gambar/anjungan-manakarra.jpg",
        mini: "gambar/anjungan-manakarra.jpg",
        alt: "Pemandangan Anjungan Manakarra di Mamuju"
    }
};

// =========================================================
// RENDER HALAMAN DETAIL
// URL contoh: detail.html?id=barane  (id tidak dikenal → Pantai Dato)
// =========================================================
const parameter = new URLSearchParams(window.location.search);
const idDipilih = DESTINASI[parameter.get("id")] ? parameter.get("id") : "dato";
const data = DESTINASI[idDipilih];

document.title = data.nama + " | Jelajah Sulbar";
document.getElementById("detailJudul").textContent = "Mengenal " + data.nama;
document.getElementById("detailRingkas").textContent = data.ringkas;
document.getElementById("detailCrumb").textContent = data.nama;
document.getElementById("detailLokasi").textContent = data.lokasi;
document.getElementById("detailNama").textContent = data.nama;
document.getElementById("detailDeskripsi").textContent = data.deskripsi;

const foto = document.getElementById("detailFoto");
foto.src = data.foto;
foto.alt = data.alt;

// Daftar daya tarik (list group Bootstrap)
const daftar = document.getElementById("detailDayaTarik");
daftar.textContent = "";
data.dayaTarik.forEach(function (teks) {
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.textContent = teks;
    daftar.appendChild(item);
});

// Destinasi lainnya (selain yang sedang dibuka) — card Bootstrap
const wadahLain = document.getElementById("detailLainnya");
wadahLain.textContent = "";

Object.keys(DESTINASI).forEach(function (id) {
    if (id === idDipilih) {
        return;
    }

    const lain = DESTINASI[id];

    const kolom = document.createElement("div");
    kolom.className = "col-12 col-sm-6 col-lg-4";

    const tautan = document.createElement("a");
    tautan.className = "card h-100 border-0 shadow-sm kartu-tautan text-decoration-none";
    tautan.href = "detail.html?id=" + id;

    const gambar = document.createElement("img");
    gambar.className = "card-img-top";
    gambar.src = lain.mini;
    gambar.alt = lain.alt;

    const isi = document.createElement("div");
    isi.className = "card-body";

    const nama = document.createElement("h3");
    nama.className = "h6 fw-bold text-body mb-1";
    nama.textContent = lain.nama;

    const lokasi = document.createElement("span");
    lokasi.className = "badge text-bg-light text-primary";
    lokasi.textContent = lain.kabupaten;

    isi.append(nama, lokasi);
    tautan.append(gambar, isi);
    kolom.appendChild(tautan);
    wadahLain.appendChild(kolom);
});
