/* ============================
   MEDCARE - SISTEM KLINIK JS
   ============================ */

// ---- STATE ----
let currentRole = 'admin';
let currentUser = null;

let dataPasien = [
  { id: 1, nama: 'Siti Rahayu', nik: '3201010101010001', umur: 34, jk: 'Perempuan', telp: '081234567890', golDarah: 'A', alamat: 'Jl. Mawar No.12, Bekasi', keluhan: 'Demam & Batuk' },
  { id: 2, nama: 'Budi Santoso', nik: '3201010202020002', umur: 45, jk: 'Laki-laki', telp: '082345678901', golDarah: 'O', alamat: 'Jl. Melati No.5, Cikarang', keluhan: 'Sakit Kepala' },
  { id: 3, nama: 'Dewi Lestari', nik: '3201010303030003', umur: 28, jk: 'Perempuan', telp: '083456789012', golDarah: 'B', alamat: 'Jl. Anggrek No.8, Karawang', keluhan: 'Perut Mual' },
];

let dataDokter = [
  { id: 1, nama: 'dr. Ahmad Fauzi', spesialis: 'Umum', telp: '081111111111', email: 'ahmad@medcare.id', jadwal: 'Senin-Jumat 08:00-14:00' },
  { id: 2, nama: 'dr. Rina Sari', spesialis: 'Anak', telp: '082222222222', email: 'rina@medcare.id', jadwal: 'Senin-Sabtu 10:00-16:00' },
  { id: 3, nama: 'dr. Hendra Wijaya', spesialis: 'Gigi', telp: '083333333333', email: 'hendra@medcare.id', jadwal: 'Selasa-Sabtu 13:00-19:00' },
];

let dataJadwal = [
  { id: 1, dokter: 'dr. Ahmad Fauzi', hari: 'Senin', mulai: '08:00', selesai: '14:00', ruangan: 'Poli Umum' },
  { id: 2, nama: 'dr. Rina Sari', hari: 'Rabu', mulai: '10:00', selesai: '16:00', ruangan: 'Poli Anak' },
];

let dataRekam = [
  { id: 1, pasienId: 1, dokterNama: 'dr. Ahmad Fauzi', tanggal: '2025-06-05', diagnosa: 'ISPA', obat: 'Paracetamol 500mg, Amoxicillin 500mg', catatan: 'Istirahat cukup, minum air banyak' },
  { id: 2, pasienId: 2, dokterNama: 'dr. Hendra Wijaya', tanggal: '2025-06-06', diagnosa: 'Migrain', obat: 'Ibuprofen 400mg', catatan: 'Hindari stress' },
];

let dataAntrian = [
  { id: 1, pasienId: 1, dokterNama: 'dr. Ahmad Fauzi', keluhan: 'Demam', status: 'Menunggu' },
  { id: 2, pasienId: 2, dokterNama: 'dr. Rina Sari', keluhan: 'Kontrol', status: 'Berlangsung' },
];

let nextPasienId = 4;
let nextDokterIdNum = 4;
let nextJadwalId = 3;
let nextRekamId = 3;
let nextAntrianId = 3;

// ---- UTILITY ----
function showToast(msg, delay = 2500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), delay);
}

function updateTopbarDate() {
  const el = document.getElementById('topbar-date');
  const now = new Date();
  el.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// ---- AUTH ----
function setRole(role, btn) {
  currentRole = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function togglePw() {
  const input = document.getElementById('login-password');
  const icon = document.getElementById('pw-icon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fa-solid fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fa-solid fa-eye';
  }
}

function doLogin() {
  const user = document.getElementById('login-username').value.trim();
  const pass = document.getElementById('login-password').value.trim();
  const errEl = document.getElementById('login-error');

  const creds = {
    admin: { u: 'admin', p: 'admin123', label: 'Administrator' },
    user:  { u: 'user',  p: 'user123',  label: 'Pengguna' },
  };

  const c = creds[currentRole];
  if (user === c.u && pass === c.p) {
    errEl.classList.add('hidden');
    currentUser = { role: currentRole, label: c.label, name: currentRole === 'admin' ? 'Admin' : 'Pengguna' };
    setupApp();
    document.getElementById('page-login').classList.remove('active');
    document.getElementById('page-app').classList.add('active');
    showToast(`Selamat datang, ${currentUser.name}! 👋`);
  } else {
    errEl.classList.remove('hidden');
  }
}

function doLogout() {
  document.getElementById('page-app').classList.remove('active');
  document.getElementById('page-login').classList.add('active');
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').classList.add('hidden');
  showToast('Berhasil keluar.');
}

// ---- SETUP APP ----
function setupApp() {
  document.getElementById('sidebar-name').textContent = currentUser.name;
  document.getElementById('sidebar-role').textContent = currentUser.label;
  document.getElementById('sidebar-avatar').textContent = currentUser.name[0].toUpperCase();

  // Hide dokter nav for non-admin
  const navDokter = document.getElementById('nav-dokter');
  if (currentRole !== 'admin') {
    navDokter.style.display = 'none';
  } else {
    navDokter.style.display = '';
  }

  updateTopbarDate();
  renderAll();
  showSection('dashboard', document.querySelector('.nav-item.active'));
}

// ---- NAVIGATION ----
function showSection(name, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  if (el) el.classList.add('active');

  const titles = { dashboard: 'Dashboard', pasien: 'Data Pasien', dokter: 'Data Dokter', jadwal: 'Jadwal Praktek', rekam: 'Rekam Medis', antrian: 'Antrian' };
  document.getElementById('topbar-title').textContent = titles[name] || name;

  // Re-render on navigate
  if (name === 'dashboard') renderDashboard();
  if (name === 'pasien') renderPasien();
  if (name === 'dokter') renderDokter();
  if (name === 'jadwal') renderJadwal();
  if (name === 'rekam') renderRekam();
  if (name === 'antrian') renderAntrian();

  // Close sidebar on mobile
  if (window.innerWidth <= 768) closeSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

// ---- RENDER ALL ----
function renderAll() {
  renderDashboard();
  renderPasien();
  renderDokter();
  renderJadwal();
  renderRekam();
  renderAntrian();
}

// ---- DASHBOARD ----
function renderDashboard() {
  animateCount('stat-pasien', dataPasien.length);
  animateCount('stat-dokter', dataDokter.length);
  animateCount('stat-antrian', dataAntrian.length);
  animateCount('stat-rekam', dataRekam.length);

  // Recent patients
  const tbody = document.getElementById('dash-pasien-list');
  const recent = dataPasien.slice(-5).reverse();
  if (recent.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="empty-state"><i class="fa-solid fa-inbox"></i><p>Belum ada data</p></td></tr>`;
    return;
  }
  tbody.innerHTML = recent.map(p => `
    <tr>
      <td>${p.nama}</td>
      <td>${p.keluhan}</td>
      <td><span class="badge badge-berlangsung">Baru</span></td>
    </tr>
  `).join('');

  // Antrian mini
  const antList = document.getElementById('dash-antrian-list');
  const aktif = dataAntrian.filter(a => a.status !== 'Selesai').slice(0, 4);
  if (aktif.length === 0) {
    antList.innerHTML = `<div class="empty-state"><i class="fa-solid fa-inbox"></i><p>Tidak ada antrian aktif</p></div>`;
    return;
  }
  antList.innerHTML = aktif.map((a, i) => {
    const pasien = dataPasien.find(p => p.id === a.pasienId);
    return `
      <div class="antrian-mini-item">
        <div class="antrian-num">${i + 1}</div>
        <div>
          <div class="antrian-mini-name">${pasien ? pasien.nama : '-'}</div>
          <div class="antrian-mini-dok">${a.dokterNama}</div>
        </div>
        <span class="badge ${a.status === 'Berlangsung' ? 'badge-berlangsung' : 'badge-menunggu'}" style="margin-left:auto">${a.status}</span>
      </div>
    `;
  }).join('');
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  let start = 0;
  const step = Math.ceil(target / 20);
  const interval = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start;
    if (start >= target) clearInterval(interval);
  }, 40);
}

// ---- PASIEN ----
function renderPasien(filter = '') {
  const tbody = document.getElementById('table-pasien');
  const list = dataPasien.filter(p =>
    p.nama.toLowerCase().includes(filter) ||
    p.nik.includes(filter) ||
    p.keluhan.toLowerCase().includes(filter)
  );

  const isAdmin = currentRole === 'admin';

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-inbox"></i><p>Tidak ada data pasien</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((p, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><b>${p.nama}</b></td>
      <td>${p.nik}</td>
      <td>${p.umur} th</td>
      <td>${p.jk}</td>
      <td>${p.telp}</td>
      <td>${p.keluhan}</td>
      <td>
        <div class="actions">
          ${isAdmin ? `<button class="btn-icon btn-edit" onclick="editPasien(${p.id})" title="Edit"><i class="fa-solid fa-pen"></i></button>` : ''}
          ${isAdmin ? `<button class="btn-icon btn-delete" onclick="deletePasien(${p.id})" title="Hapus"><i class="fa-solid fa-trash"></i></button>` : ''}
          ${!isAdmin ? '<span style="color:var(--gray-400);font-size:.8rem">Lihat saja</span>' : ''}
        </div>
      </td>
    </tr>
  `).join('');

  // Hide add button for user
  document.getElementById('btn-tambah-pasien').style.display = isAdmin ? '' : 'none';
}

function filterPasien() {
  const q = document.getElementById('search-pasien').value.toLowerCase();
  renderPasien(q);
}

function savePasien() {
  const editId = document.getElementById('pasien-edit-id').value;
  const nama = document.getElementById('p-nama').value.trim();
  const nik = document.getElementById('p-nik').value.trim();
  const umur = document.getElementById('p-umur').value;
  const jk = document.getElementById('p-jk').value;
  const telp = document.getElementById('p-telp').value.trim();
  const gol = document.getElementById('p-gol').value;
  const alamat = document.getElementById('p-alamat').value.trim();
  const keluhan = document.getElementById('p-keluhan').value.trim();

  if (!nama || !nik || !umur || !jk) { showToast('⚠️ Nama, NIK, Umur & JK wajib diisi!'); return; }

  if (editId) {
    const idx = dataPasien.findIndex(p => p.id == editId);
    dataPasien[idx] = { id: parseInt(editId), nama, nik, umur: parseInt(umur), jk, telp, golDarah: gol, alamat, keluhan };
    showToast('✅ Data pasien diperbarui!');
  } else {
    dataPasien.push({ id: nextPasienId++, nama, nik, umur: parseInt(umur), jk, telp, golDarah: gol, alamat, keluhan });
    showToast('✅ Pasien berhasil ditambahkan!');
  }
  closeModal('modal-pasien');
  renderPasien();
  renderDashboard();
}

function editPasien(id) {
  const p = dataPasien.find(x => x.id === id);
  document.getElementById('pasien-edit-id').value = id;
  document.getElementById('p-nama').value = p.nama;
  document.getElementById('p-nik').value = p.nik;
  document.getElementById('p-umur').value = p.umur;
  document.getElementById('p-jk').value = p.jk;
  document.getElementById('p-telp').value = p.telp;
  document.getElementById('p-gol').value = p.golDarah;
  document.getElementById('p-alamat').value = p.alamat;
  document.getElementById('p-keluhan').value = p.keluhan;
  document.getElementById('modal-pasien-title').textContent = 'Edit Pasien';
  openModal('modal-pasien');
}

function deletePasien(id) {
  if (!confirm('Yakin ingin menghapus data pasien ini?')) return;
  dataPasien = dataPasien.filter(p => p.id !== id);
  renderPasien();
  renderDashboard();
  showToast('🗑️ Data pasien dihapus.');
}

// ---- DOKTER ----
function renderDokter(filter = '') {
  const tbody = document.getElementById('table-dokter');
  const list = dataDokter.filter(d =>
    d.nama.toLowerCase().includes(filter) ||
    d.spesialis.toLowerCase().includes(filter)
  );
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><i class="fa-solid fa-inbox"></i><p>Tidak ada data dokter</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = list.map((d, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><b>${d.nama}</b></td>
      <td>${d.spesialis}</td>
      <td>${d.telp}</td>
      <td>${d.jadwal}</td>
      <td>
        <div class="actions">
          <button class="btn-icon btn-edit" onclick="editDokter(${d.id})" title="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon btn-delete" onclick="deleteDokter(${d.id})" title="Hapus"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function filterDokter() {
  renderDokter(document.getElementById('search-dokter').value.toLowerCase());
}

function saveDokter() {
  const editId = document.getElementById('dokter-edit-id').value;
  const nama = document.getElementById('d-nama').value.trim();
  const spesialis = document.getElementById('d-spesialis').value.trim();
  const telp = document.getElementById('d-telp').value.trim();
  const email = document.getElementById('d-email').value.trim();
  const jadwal = document.getElementById('d-jadwal').value.trim();

  if (!nama || !spesialis) { showToast('⚠️ Nama & Spesialis wajib diisi!'); return; }

  if (editId) {
    const idx = dataDokter.findIndex(d => d.id == editId);
    dataDokter[idx] = { id: parseInt(editId), nama, spesialis, telp, email, jadwal };
    showToast('✅ Data dokter diperbarui!');
  } else {
    dataDokter.push({ id: nextDokterIdNum++, nama, spesialis, telp, email, jadwal });
    showToast('✅ Dokter berhasil ditambahkan!');
  }
  closeModal('modal-dokter');
  renderDokter();
  renderDashboard();
  refreshDokterSelects();
}

function editDokter(id) {
  const d = dataDokter.find(x => x.id === id);
  document.getElementById('dokter-edit-id').value = id;
  document.getElementById('d-nama').value = d.nama;
  document.getElementById('d-spesialis').value = d.spesialis;
  document.getElementById('d-telp').value = d.telp;
  document.getElementById('d-email').value = d.email;
  document.getElementById('d-jadwal').value = d.jadwal;
  document.getElementById('modal-dokter-title').textContent = 'Edit Dokter';
  openModal('modal-dokter');
}

function deleteDokter(id) {
  if (!confirm('Yakin ingin menghapus data dokter ini?')) return;
  dataDokter = dataDokter.filter(d => d.id !== id);
  renderDokter();
  renderDashboard();
  showToast('🗑️ Data dokter dihapus.');
}

// ---- JADWAL ----
function renderJadwal() {
  const tbody = document.getElementById('table-jadwal');
  if (dataJadwal.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fa-solid fa-inbox"></i><p>Tidak ada jadwal</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = dataJadwal.map((j, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${j.dokter}</td>
      <td>${j.hari}</td>
      <td>${j.mulai}</td>
      <td>${j.selesai}</td>
      <td>${j.ruangan}</td>
      <td>
        <div class="actions">
          <button class="btn-icon btn-delete" onclick="deleteJadwal(${j.id})" title="Hapus"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function saveJadwal() {
  const dokter = document.getElementById('j-dokter').value;
  const hari = document.getElementById('j-hari').value;
  const mulai = document.getElementById('j-mulai').value;
  const selesai = document.getElementById('j-selesai').value;
  const ruangan = document.getElementById('j-ruangan').value.trim();

  if (!dokter || !hari || !mulai || !selesai) { showToast('⚠️ Semua field wajib diisi!'); return; }

  dataJadwal.push({ id: nextJadwalId++, dokter, hari, mulai, selesai, ruangan });
  closeModal('modal-jadwal');
  renderJadwal();
  showToast('✅ Jadwal berhasil ditambahkan!');
}

function deleteJadwal(id) {
  if (!confirm('Hapus jadwal ini?')) return;
  dataJadwal = dataJadwal.filter(j => j.id !== id);
  renderJadwal();
  showToast('🗑️ Jadwal dihapus.');
}

// ---- REKAM MEDIS ----
function renderRekam(filter = '') {
  const tbody = document.getElementById('table-rekam');
  const list = dataRekam.filter(r => {
    const p = dataPasien.find(x => x.id === r.pasienId);
    const nama = p ? p.nama.toLowerCase() : '';
    return nama.includes(filter) || r.diagnosa.toLowerCase().includes(filter) || r.dokterNama.toLowerCase().includes(filter);
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fa-solid fa-inbox"></i><p>Tidak ada rekam medis</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = list.map((r, i) => {
    const p = dataPasien.find(x => x.id === r.pasienId);
    return `
      <tr>
        <td>${i + 1}</td>
        <td>${p ? p.nama : '-'}</td>
        <td>${r.dokterNama}</td>
        <td>${r.tanggal}</td>
        <td>${r.diagnosa}</td>
        <td>${r.obat}</td>
        <td>
          <div class="actions">
            <button class="btn-icon btn-edit" onclick="editRekam(${r.id})" title="Edit"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-icon btn-delete" onclick="deleteRekam(${r.id})" title="Hapus"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function filterRekam() {
  renderRekam(document.getElementById('search-rekam').value.toLowerCase());
}

function saveRekam() {
  const editId = document.getElementById('rekam-edit-id').value;
  const pasienId = parseInt(document.getElementById('r-pasien').value);
  const dokterNama = document.getElementById('r-dokter').value;
  const tanggal = document.getElementById('r-tanggal').value;
  const diagnosa = document.getElementById('r-diagnosa').value.trim();
  const obat = document.getElementById('r-obat').value.trim();
  const catatan = document.getElementById('r-catatan').value.trim();

  if (!pasienId || !dokterNama || !tanggal || !diagnosa) { showToast('⚠️ Data utama wajib diisi!'); return; }

  if (editId) {
    const idx = dataRekam.findIndex(r => r.id == editId);
    dataRekam[idx] = { id: parseInt(editId), pasienId, dokterNama, tanggal, diagnosa, obat, catatan };
    showToast('✅ Rekam medis diperbarui!');
  } else {
    dataRekam.push({ id: nextRekamId++, pasienId, dokterNama, tanggal, diagnosa, obat, catatan });
    showToast('✅ Rekam medis ditambahkan!');
  }
  closeModal('modal-rekam');
  renderRekam();
  renderDashboard();
}

function editRekam(id) {
  const r = dataRekam.find(x => x.id === id);
  document.getElementById('rekam-edit-id').value = id;
  document.getElementById('r-pasien').value = r.pasienId;
  document.getElementById('r-dokter').value = r.dokterNama;
  document.getElementById('r-tanggal').value = r.tanggal;
  document.getElementById('r-diagnosa').value = r.diagnosa;
  document.getElementById('r-obat').value = r.obat;
  document.getElementById('r-catatan').value = r.catatan;
  document.getElementById('modal-rekam-title').textContent = 'Edit Rekam Medis';
  openModal('modal-rekam');
}

function deleteRekam(id) {
  if (!confirm('Hapus rekam medis ini?')) return;
  dataRekam = dataRekam.filter(r => r.id !== id);
  renderRekam();
  renderDashboard();
  showToast('🗑️ Rekam medis dihapus.');
}

// ---- ANTRIAN ----
function renderAntrian() {
  const board = document.getElementById('antrian-board');
  if (dataAntrian.length === 0) {
    board.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fa-solid fa-inbox"></i><p>Tidak ada antrian hari ini</p></div>`;
    return;
  }
  board.innerHTML = dataAntrian.map((a, i) => {
    const pasien = dataPasien.find(p => p.id === a.pasienId);
    return `
      <div class="antrian-card">
        <div class="antrian-card-header">
          <div class="antrian-number">${i + 1}</div>
          <span class="badge ${a.status === 'Berlangsung' ? 'badge-berlangsung' : a.status === 'Selesai' ? 'badge-selesai' : 'badge-menunggu'}">${a.status}</span>
        </div>
        <div class="antrian-card-name">${pasien ? pasien.nama : '-'}</div>
        <div class="antrian-card-dok"><i class="fa-solid fa-user-doctor" style="color:var(--green-500);margin-right:4px"></i>${a.dokterNama}</div>
        <div class="antrian-card-keluhan">${a.keluhan}</div>
        <div class="antrian-card-actions">
          ${a.status === 'Menunggu' ? `<button class="btn-next" onclick="nextAntrian(${a.id})"><i class="fa-solid fa-play"></i> Mulai</button>` : ''}
          ${a.status === 'Berlangsung' ? `<button class="btn-next" onclick="selesaiAntrian(${a.id})"><i class="fa-solid fa-check"></i> Selesai</button>` : ''}
          <button class="btn-hapus-antrian" onclick="deleteAntrian(${a.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join('');
}

function saveAntrian() {
  const pasienId = parseInt(document.getElementById('a-pasien').value);
  const dokterNama = document.getElementById('a-dokter').value;
  const keluhan = document.getElementById('a-keluhan').value.trim();

  if (!pasienId || !dokterNama || !keluhan) { showToast('⚠️ Semua field wajib diisi!'); return; }

  dataAntrian.push({ id: nextAntrianId++, pasienId, dokterNama, keluhan, status: 'Menunggu' });
  closeModal('modal-antrian');
  renderAntrian();
  renderDashboard();
  showToast('✅ Antrian berhasil ditambahkan!');
}

function nextAntrian(id) {
  const a = dataAntrian.find(x => x.id === id);
  if (a) a.status = 'Berlangsung';
  renderAntrian();
  renderDashboard();
}
function selesaiAntrian(id) {
  const a = dataAntrian.find(x => x.id === id);
  if (a) a.status = 'Selesai';
  renderAntrian();
  renderDashboard();
}
function deleteAntrian(id) {
  if (!confirm('Hapus antrian ini?')) return;
  dataAntrian = dataAntrian.filter(a => a.id !== id);
  renderAntrian();
  renderDashboard();
  showToast('🗑️ Antrian dihapus.');
}

// ---- MODAL ----
function openModal(id) {
  // Reset forms
  if (id === 'modal-pasien') {
    document.getElementById('pasien-edit-id').value = '';
    document.getElementById('modal-pasien-title').textContent = 'Tambah Pasien';
    ['p-nama','p-nik','p-umur','p-jk','p-telp','p-gol','p-alamat','p-keluhan'].forEach(f => {
      const el = document.getElementById(f);
      if (el) el.value = '';
    });
  }
  if (id === 'modal-dokter') {
    document.getElementById('dokter-edit-id').value = '';
    document.getElementById('modal-dokter-title').textContent = 'Tambah Dokter';
    ['d-nama','d-spesialis','d-telp','d-email','d-jadwal'].forEach(f => {
      const el = document.getElementById(f);
      if (el) el.value = '';
    });
  }
  if (id === 'modal-jadwal') {
    document.getElementById('jadwal-edit-id').value = '';
    refreshDokterSelectSingle('j-dokter');
  }
  if (id === 'modal-rekam') {
    document.getElementById('rekam-edit-id').value = '';
    document.getElementById('modal-rekam-title').textContent = 'Tambah Rekam Medis';
    refreshPasienSelect('r-pasien');
    refreshDokterSelectSingle('r-dokter');
    document.getElementById('r-tanggal').value = new Date().toISOString().split('T')[0];
    ['r-diagnosa','r-obat','r-catatan'].forEach(f => {
      const el = document.getElementById(f); if (el) el.value = '';
    });
  }
  if (id === 'modal-antrian') {
    refreshPasienSelect('a-pasien');
    refreshDokterSelectSingle('a-dokter');
    document.getElementById('a-keluhan').value = '';
  }

  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function refreshDokterSelects() {
  refreshDokterSelectSingle('j-dokter');
  refreshDokterSelectSingle('r-dokter');
  refreshDokterSelectSingle('a-dokter');
}

function refreshDokterSelectSingle(selId) {
  const sel = document.getElementById(selId);
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = '<option value="">Pilih Dokter</option>' +
    dataDokter.map(d => `<option value="${d.nama}" ${d.nama === cur ? 'selected' : ''}>${d.nama} (${d.spesialis})</option>`).join('');
}

function refreshPasienSelect(selId) {
  const sel = document.getElementById(selId);
  if (!sel) return;
  sel.innerHTML = '<option value="">Pilih Pasien</option>' +
    dataPasien.map(p => `<option value="${p.id}">${p.nama}</option>`).join('');
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('open');
  });
});

// Enter key login
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('page-login').classList.contains('active')) {
    doLogin();
  }
});

// ---- INIT ----
updateTopbarDate();
