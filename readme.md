# Keito Auto-Play Bot

Keito Auto-Play Bot adalah skrip otomatis untuk bermain game Keito dan mengklaim quest secara otomatis. Skrip ini dibuat menggunakan Node.js dengan ESM module.

## 🚀 Fitur
- **Auto Play**: Memulai dan mengakhiri permainan secara otomatis.
- **Quest Auto Claim**: Mengecek dan mengklaim hadiah dari quest yang tersedia.
- **User Info & Game State**: Menampilkan informasi akun dan status game.
- **Logging**: Menampilkan log status menggunakan `chalk`.

## 📌 Persyaratan
- **Node.js** (versi terbaru direkomendasikan)
- **NPM atau Yarn**

## 🔧 Instalasi
1. Clone repository ini:
   ```sh
   git clone https://github.com/username/keito-auto-play.git
   cd keito-auto-play
   ```

2. Instal dependensi yang diperlukan:
   ```sh
   npm install
   ```
   atau jika menggunakan Yarn:
   ```sh
   yarn install
   ```

3. Buat file `.env` di root direktori dan isi dengan data berikut:
   ```env
   UID=your_uid_here
   X_TOKEN=your_x_token_here
   COOKIES=your_cookies_here
   ```

## 🏃 Menjalankan Bot
Jalankan bot menggunakan perintah berikut:
```sh
node index.js
```

Atau jika menggunakan Nodemon (untuk live reload saat pengembangan):
```sh
npx nodemon index.js
```

## 🛠 Konfigurasi
File `config` bisa disesuaikan sesuai kebutuhan:
```js
const config = {
  uid: process.env.UID,
  baseUrl: "https://game.keitokun.com/api/v1",
  token: process.env.X_TOKEN,
  cookies: process.env.COOKIES,
  checkInterval: 60000, // Interval pengecekan game (dalam ms)
  questCheckInterval: 300000 // Interval pengecekan quest (dalam ms)
};
```

## 📜 Lisensi
Proyek ini menggunakan lisensi **MIT**. Bebas digunakan dan dimodifikasi.

## 🤝 Kontribusi
Jika ingin berkontribusi, silakan fork repository ini dan buat pull request!

---
🎮 Selamat bermain dan semoga sukses! 🚀

