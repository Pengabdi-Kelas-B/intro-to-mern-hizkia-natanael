# MongoDB Movie Collection CLI

Ini adalah aplikasi Command Line Interface (CLI) sederhana menggunakan Node.js dan MongoDB untuk mengelola koleksi data film. Aplikasi ini mendukung beberapa perintah seperti memeriksa koneksi database, melakukan bulk insert data film, mendapatkan semua data film, dan mereset data film.

## Fitur
- **check-db-connection**: Memeriksa status koneksi MongoDB.
- **bulk-insert**: Memasukkan data film dalam jumlah banyak dari file `seed.json`.
- **get-all**: Mengambil semua data film dari koleksi.
- **reset-db**: Menghapus semua data film dari koleksi.

## Prasyarat
- **Node.js** harus terinstal di mesin Anda.
- **MongoDB** harus berjalan, dan URI MongoDB sudah disiapkan di file `.env`.
- **npm** sudah terinstal untuk mengelola dependensi.

## Instalasi

1. Clone repositori ini ke mesin lokal Anda:
    ```bash
    git clone https://github.com/username/repo-name.git
    ```

2. Masuk ke direktori proyek:
    ```bash
    cd repo-name
    ```

3. Instal semua dependensi yang dibutuhkan:
    ```bash
    npm install
    ```

4. Siapkan file `.env` di root proyek, contoh isi file `.env`:
    ```
    MONGODB_URI=mongodb://localhost:27017/nama-database-anda
    MONGODB_COLLECTION=nama-koleksi-anda
    ```

5. Siapkan file `seed.json` yang berisi data film untuk dimasukkan ke database. Contoh format file:
    ```json
    [
      {
        "title": "Inception",
        "year": 2010,
        "genre": ["Sci-Fi", "Action"],
        "description": "A mind-bending thriller by Christopher Nolan.",
        "director": "Christopher Nolan",
        "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
      },
      {
        "title": "The Matrix",
        "year": 1999,
        "genre": ["Sci-Fi", "Action"],
        "description": "A hacker discovers the world is a simulation.",
        "director": "The Wachowskis",
        "cast": ["Keanu Reeves", "Laurence Fishburne"]
      }
    ]
    ```

## Cara Menjalankan Program

1. **Memeriksa Koneksi ke Database**:
    ```bash
    node app.js check-db-connection
    ```
    Perintah ini akan memeriksa apakah koneksi ke MongoDB berhasil.

2. **Bulk Insert Data Film**:
    ```bash
    node app.js bulk-insert
    ```
    Perintah ini akan memasukkan data film yang ada di file `seed.json` ke dalam koleksi MongoDB.

3. **Mengambil Semua Data Film**:
    ```bash
    node app.js get-all
    ```
    Perintah ini akan menampilkan semua data film yang ada dalam koleksi.

4. **Mereset (Menghapus Semua Data)**:
    ```bash
    node app.js reset-db
    ```
    Perintah ini akan menghapus semua data film yang ada dalam koleksi.

## Penutupan Koneksi
Program ini secara otomatis memutuskan koneksi ke MongoDB setelah setiap operasi selesai.

## Catatan
- Pastikan MongoDB sudah berjalan dan file `.env` sudah dikonfigurasi dengan benar sebelum menjalankan perintah di atas.
- Semua perintah dijalankan menggunakan CLI dengan format `node app.js <command>`.

