# Login Application Frontend (Angular)

This is the frontend for a login application built with [Angular](https://angular.dev/) and the [Angular CLI](https://github.com/angular/angular-cli).

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

*   **Node.js**: The Long Term Support (LTS) version is recommended. You can download it from [nodejs.org](https://nodejs.org).
*   **npm**: The Node.js package manager, which is typically installed automatically with Node.js.
*   **Angular CLI**: The command-line interface for managing Angular projects. Install it globally using the following command:
    ```bash
    npm install -g @angular/cli
    ```
*   **Git**: A version control system for cloning the project. You can download it from [git-scm.com](https://git-scm.com).

## Installation and Setup Guide

Follow the steps below to install and run this project in your local environment.

### 1. Clone the Repository

Open your terminal or command prompt and run the following command to download the project's source code from the repository.

```bash
# Replace <REPOSITORY_URL> with your Git repository URL
git clone <REPOSITORY_URL>
```

### 2. Masuk ke Direktori Proyek

Setelah proses kloning selesai, masuk ke direktori frontend proyek.

```bash
cd nama-folder-proyek/frontend
```

### 3. Instal Dependensi

Jalankan perintah berikut untuk menginstal semua paket dan dependensi yang diperlukan oleh proyek. Proses ini mungkin memakan waktu beberapa menit.

```bash
npm install
```

### 4. Konfigurasi Lingkungan (Opsional)

Aplikasi ini mungkin perlu terhubung ke server backend. Anda dapat mengonfigurasi URL API di file environment.

*   Buka file `src/environments/environment.ts` (untuk mode pengembangan).
*   Sesuaikan nilai `apiUrl` dengan alamat API backend Anda.

Contoh:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api' // Sesuaikan dengan URL backend Anda
};
```

### 5. Jalankan Server Pengembangan

Setelah semua dependensi terinstal, jalankan server pengembangan lokal dengan perintah:

```bash
ng serve
```

Tunggu hingga proses kompilasi selesai. Kemudian, buka browser Anda dan navigasikan ke `http://localhost:4200/`. Aplikasi akan berjalan dan akan otomatis me-reload jika Anda melakukan perubahan pada file sumber.

## Perintah Lainnya

### Build untuk Produksi
Untuk membuat versi produksi dari aplikasi, jalankan perintah:
```bash
ng build
```
Hasil build akan disimpan di dalam direktori `dist/`.

### Menjalankan Unit Tests
Untuk menjalankan pengujian unit menggunakan Karma:
```bash
ng test
```
