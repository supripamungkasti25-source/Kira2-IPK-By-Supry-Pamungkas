// ================= DATA MATA KULIAH =================
const matkul = [
  {
    nama: "Organisasi Arsitektur Komputer",
    sks: 2,
    bobot: { hadir:0.10, tugasCase:0.45, project:0.00, quiz:0.05, uts:0.20, uas:0.20 }
  },
  {
    nama: "Bahasa Inggris",
    sks: 2,
    bobot: { hadir:0.05, tugasCase:0.30, project:0.00, quiz:0.15, uts:0.25, uas:0.25 }
  },
  {
    nama: "Pancasila",
    sks: 2,
    bobot: { hadir:0.10, tugasCase:0.45, project:0.00, quiz:0.05, uts:0.20, uas:0.20 }
  },
  {
    nama: "Statistika",
    sks: 3,
    bobot: { hadir:0.10, tugasCase:0.45, project:0.00, quiz:0.05, uts:0.20, uas:0.20 }
  },
  {
    nama: "Kalkulus",
    sks: 3,
    bobot: { hadir:0.10, tugasCase:0.45, project:0.00, quiz:0.05, uts:0.20, uas:0.20 }
  },
  {
    nama: "Logika",
    sks: 3,
    bobot: { hadir:0.10, tugasCase:0.45, project:0.00, quiz:0.05, uts:0.20, uas:0.20 }
  },
  {
    nama: "Algoritma",
    sks: 4,
    bobot: { hadir:0.10, tugasCase:0.45, project:0.00, quiz:0.05, uts:0.20, uas:0.20 }
  }
];

// ================= RENDER FORM =================
const form = document.getElementById("form");

matkul.forEach((m, i) => {
  let formHtml = `<div class="matkul">
      <h2>${m.nama} (${m.sks} SKS)</h2>
      <button class="select-all-btn" onclick="selectAllSessions(${i})">Select All Sessions</button>
      <button class="select-all-btn" onclick="selectAllCases(${i})">Select All Cases</button>
      <table class="assessment-table">
        <thead>
          <tr>
            <th>Week</th>
            <th>Session</th>
            <th>Case</th>
            <th>Quiz</th>
          </tr>
        </thead>
        <tbody>`;
  for (let j = 0; j < 14; j++) {
    formHtml += `<tr>
          <td>${j+1}</td>
          <td><input id="hadir${i}_${j}" type="checkbox"></td>
          <td><input id="tugasCase${i}_${j}" type="checkbox"></td>
          <td><input id="quiz${i}_${j}" type="number" min="0" max="100" value="0"></td>
        </tr>`;
  }
  formHtml += `</tbody>
      </table>
      <div class="input-group">
        <label>UTS <input id="uts${i}" type="number" min="0" max="100"></label>
        <label>UAS <input id="uas${i}" type="number" min="0" max="100"></label>
      </div>
    </div>`;
  form.innerHTML += formHtml;
});

// ================= FUNGSI =================
function konversi14(x) {
  if (x < 0) x = 0;
  if (x > 14) x = 14;
  return (x / 14) * 100;
}

function konversiIP(nilai) {
  if (nilai >= 85) return 4;
  if (nilai >= 70) return 3;
  if (nilai >= 55) return 2;
  if (nilai >= 40) return 1;
  return 0; // E
}

function selectAllSessions(courseIndex) {
  for (let j = 0; j < 14; j++) {
    const checkbox = document.getElementById(`hadir${courseIndex}_${j}`);
    if (checkbox) {
      checkbox.checked = true;
    }
  }
}

function selectAllCases(courseIndex) {
  for (let j = 0; j < 14; j++) {
    const checkbox = document.getElementById(`tugasCase${courseIndex}_${j}`);
    if (checkbox) {
      checkbox.checked = true;
    }
  }
}

function hitungIPK() {
  console.log("Calculating IPK...");
  let totalNilai = 0;
  let totalSKS = 0;
  let output = "";

  matkul.forEach((m, i) => {
    let hadirCount = 0;
    for (let j = 0; j < 14; j++) {
      const elem = document.getElementById(`hadir${i}_${j}`);
      if (elem && elem.checked) hadirCount++;
    }
    const hadir = konversi14(hadirCount);

    let tugasCaseCount = 0;
    for (let j = 0; j < 14; j++) {
      const elem = document.getElementById(`tugasCase${i}_${j}`);
      if (elem && elem.checked) tugasCaseCount++;
    }
    const tugasCase = konversi14(tugasCaseCount);

    let projectCount = 0;
    for (let j = 0; j < 14; j++) {
      const elem = document.getElementById(`project${i}_${j}`);
      if (elem && elem.checked) projectCount++;
    }
    const project = konversi14(projectCount);

    let quizSum = 0;
    let quizCount = 0;
    for (let j = 0; j < 14; j++) {
      const elem = document.getElementById(`quiz${i}_${j}`);
      const quizValue = elem ? +elem.value || 0 : 0;
      quizSum += quizValue;
      quizCount++;
    }
    const quiz = quizCount > 0 ? quizSum / quizCount : 0;
    const utsElem = document.getElementById(`uts${i}`);
    const uasElem = document.getElementById(`uas${i}`);
    const uts = utsElem ? +utsElem.value || 0 : 0;
    const uas = uasElem ? +uasElem.value || 0 : 0;

    const nilaiAkhir =
      hadir      * m.bobot.hadir +
      tugasCase * m.bobot.tugasCase +
      project   * m.bobot.project +
      quiz      * m.bobot.quiz +
      uts       * m.bobot.uts +
      uas       * m.bobot.uas;

    const ip = konversiIP(nilaiAkhir);

    totalNilai += ip * m.sks;
    totalSKS += m.sks;

    output += `${m.nama}: Nilai ${nilaiAkhir.toFixed(2)} | IP ${ip}<br>`;
  });

  const ipk = (totalNilai / totalSKS).toFixed(2);
  console.log("IPK calculated:", ipk);
  console.log("Output HTML:", output + `<hr><b>IPK Semester: ${ipk}</b><br><small>*Hasil perkiraan</small>`);

  const outputElement = document.getElementById("output");
  console.log("Output element found:", outputElement);
  outputElement.innerHTML = output + `<hr><b>IPK Semester: ${ipk}</b><br><small>*Hasil perkiraan</small>`;
  console.log("Output set successfully");
}
