// =========================================================
// VALIDASI FORM LOGIN (hanya berjalan di login.html)
// Validasi sisi browser saja — bukan sistem autentikasi sungguhan.
// =========================================================
const formLogin = document.getElementById("formLogin");

if (formLogin) {
    const inputUsername = document.getElementById("username");
    const inputPassword = document.getElementById("password");
    const errorUsername = document.getElementById("errorUsername");
    const errorPassword = document.getElementById("errorPassword");
    const pesanLogin = document.getElementById("pesanLogin");

    const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const MIN_USERNAME = 4;
    const MIN_PASSWORD = 8;
    const HALAMAN_TUJUAN = "index.html"; // halaman setelah login berhasil
    const JEDA_ALIHKAN = 1500;            // milidetik

    // Menampilkan alert Bootstrap
    function tampilkanAlert(jenis, teks) {
        pesanLogin.innerHTML = "";
        const alert = document.createElement("div");
        alert.className = "alert alert-" + jenis + " alert-dismissible fade show";
        alert.textContent = teks;
        const tutup = document.createElement("button");
        tutup.type = "button";
        tutup.className = "btn-close";
        tutup.setAttribute("data-bs-dismiss", "alert");
        tutup.setAttribute("aria-label", "Tutup");
        alert.appendChild(tutup);
        pesanLogin.appendChild(alert);
    }

    function setSalah(input, wadahError, teks) {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        wadahError.textContent = teks;
    }

    function setBenar(input) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }

    function validasiUsername() {
        const nilai = inputUsername.value.trim();
        if (nilai === "") {
            setSalah(inputUsername, errorUsername, "Username atau email wajib diisi!");
            return false;
        }
        if (nilai.includes("@")) {
            if (!POLA_EMAIL.test(nilai)) {
                setSalah(inputUsername, errorUsername, "Format email tidak valid. Contoh: nama@email.com");
                return false;
            }
        } else if (nilai.length < MIN_USERNAME) {
            setSalah(inputUsername, errorUsername, "Username minimal " + MIN_USERNAME + " karakter.");
            return false;
        }
        setBenar(inputUsername);
        return true;
    }

    function validasiPassword() {
        const nilai = inputPassword.value;
        if (nilai === "") {
            setSalah(inputPassword, errorPassword, "Password wajib diisi!");
            return false;
        }
        if (nilai.length < MIN_PASSWORD) {
            setSalah(inputPassword, errorPassword, "Password minimal " + MIN_PASSWORD + " karakter.");
            return false;
        }
        setBenar(inputPassword);
        return true;
    }

    // Validasi langsung saat pengguna mengetik (setelah pernah dicek)
    inputUsername.addEventListener("input", function () {
        if (inputUsername.classList.contains("is-invalid")) validasiUsername();
    });
    inputPassword.addEventListener("input", function () {
        if (inputPassword.classList.contains("is-invalid")) validasiPassword();
    });

    formLogin.addEventListener("submit", function (event) {
        event.preventDefault(); // form tidak pernah diproses ke server

        // Jalankan keduanya agar semua error tampil sekaligus
        const usernameValid = validasiUsername();
        const passwordValid = validasiPassword();

        if (!usernameValid || !passwordValid) {
            tampilkanAlert("danger", "Login gagal. Periksa kembali isian yang ditandai merah.");
            return;
        }

        tampilkanAlert("success", "Login berhasil! Mengalihkan ke halaman beranda...");
        formLogin.querySelector("button[type=submit]").disabled = true;

        // Alihkan ke beranda setelah pesan sempat terbaca
        setTimeout(function () {
            window.location.href = HALAMAN_TUJUAN;
        }, JEDA_ALIHKAN);
    });
}
