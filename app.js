/**
 * TP N° 3: ALGORITMOS DE PLANIFICACIÓN DE CPU
 * Cátedra: Teoría de Sistemas Operativos (TSO) — UNJu FI (Ciclo 2026)
 * Motor de Simulación Interactivo, Animación Anime.js, ApexCharts y Evaluador JSON
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DATOS DE SIMULACIÓN OFICIALES DE CÁTEDRA
  // ==========================================
  const SIMULATION_DATA = {
    fcfs: {
      name: "FCFS (First-Come, First-Served)",
      exec: ["A", "C", "C", "B", "B", "A", "A", "C", "D", "D", "D", "D", "D", "E", "B", "B", "A", "A", "A", "C", "C", "E", "E", "C"],
      ready: [
        ["A", "C"], ["C"], ["B", "A"], ["B", "A"], ["A", "C"], ["A", "C", "D"], ["C", "D", "E"], ["C", "D", "E"], 
        ["D", "E", "B"], ["E", "B", "A"], ["E", "B", "A", "C"], ["E", "B", "A", "C"], ["E", "B", "A", "C"], ["B", "A", "C"], 
        ["A", "C", "E"], ["A", "C", "E"], ["C", "E"], ["C", "E"], ["C", "E"], ["E", "C"], ["E", "C"], ["E"], ["E"], []
      ],
      io: [
        [], ["A"], [], ["C"], ["B"], ["B"], ["B", "A"], ["A", "C"], [], [], [], [], [], [], [], [], [], [], [], ["E"], ["E"], ["C"], ["C"], []
      ],
      metrics: [
        { proc: "A", ti: 0, tf: 21, t: 6, T: 21, E: 15, IP: 3.50, IR: 0.286 },
        { proc: "B", ti: 2, tf: 18, t: 4, T: 16, E: 12, IP: 4.00, IR: 0.250 },
        { proc: "C", ti: 0, tf: 27, t: 6, T: 27, E: 21, IP: 4.50, IR: 0.222 },
        { proc: "D", ti: 5, tf: 13, t: 5, T: 8, E: 3, IP: 1.60, IR: 0.625 },
        { proc: "E", ti: 6, tf: 25, t: 5, T: 19, E: 14, IP: 3.80, IR: 0.263 }
      ],
      averages: { T: 18.2, E: 13.0, IP: 3.48, IR: 0.330 }
    },

    sjn: {
      name: "SJN / SJF (Shortest Job Next - No Apropiativo)",
      exec: ["A", "C", "C", "A", "A", "C", "B", "B", "C", "A", "A", "A", "C", "B", "B", "E", "E", "D", "D", "D", "D", "D", "E", "E"],
      ready: [
        ["A", "C"], ["C"], ["C", "B"], ["A"], ["C", "B"], ["C", "B", "D"], ["B", "D", "E"], ["B", "D", "E"],
        ["C", "D", "E"], ["A", "D", "E"], ["A", "D", "E", "B"], ["A", "D", "E", "B"], ["C", "D", "E", "B"], ["B", "D", "E"],
        ["B", "D", "E"], ["E", "D"], ["E", "D"], ["D"], ["D"], ["D"], ["D"], ["D"], ["E"], []
      ],
      io: [
        [], ["A"], [], [], ["C"], ["A"], ["A", "C"], ["C"], ["B"], ["B", "C"], ["C"], [], [], [], [], [], [], ["E"], ["E"], [], [], [], [], []
      ],
      metrics: [
        { proc: "A", ti: 0, tf: 13, t: 6, T: 13, E: 7, IP: 2.17, IR: 0.462 },
        { proc: "B", ti: 2, tf: 16, t: 4, T: 14, E: 10, IP: 3.50, IR: 0.286 },
        { proc: "C", ti: 0, tf: 14, t: 6, T: 14, E: 8, IP: 2.33, IR: 0.429 },
        { proc: "D", ti: 5, tf: 24, t: 5, T: 19, E: 14, IP: 3.80, IR: 0.263 },
        { proc: "E", ti: 6, tf: 26, t: 5, T: 20, E: 15, IP: 4.00, IR: 0.250 }
      ],
      averages: { T: 16.0, E: 10.8, IP: 3.16, IR: 0.338 }
    },

    srt: {
      name: "SRT (Shortest Remaining Time - Apropiativo)",
      exec: ["A", "C", "C", "A", "A", "C", "B", "B", "C", "A", "A", "A", "C", "B", "B", "E", "E", "D", "D", "D", "D", "D", "E", "E"],
      ready: [
        ["A", "C"], ["C"], ["C", "B"], ["A"], ["C", "B"], ["C", "B", "D"], ["B", "D", "E"], ["B", "D", "E"],
        ["C", "D", "E"], ["A", "D", "E"], ["A", "D", "E", "B"], ["A", "D", "E", "B"], ["C", "D", "E", "B"], ["B", "D", "E"],
        ["B", "D", "E"], ["E", "D"], ["E", "D"], ["D"], ["D"], ["D"], ["D"], ["D"], ["E"], []
      ],
      io: [
        [], ["A"], [], [], ["C"], ["A"], ["A", "C"], ["C"], ["B"], ["B", "C"], ["C"], [], [], [], [], [], [], ["E"], ["E"], [], [], [], [], []
      ],
      metrics: [
        { proc: "A", ti: 0, tf: 13, t: 6, T: 13, E: 7, IP: 2.17, IR: 0.462 },
        { proc: "B", ti: 2, tf: 16, t: 4, T: 14, E: 10, IP: 3.50, IR: 0.286 },
        { proc: "C", ti: 0, tf: 14, t: 6, T: 14, E: 8, IP: 2.33, IR: 0.429 },
        { proc: "D", ti: 5, tf: 24, t: 5, T: 19, E: 14, IP: 3.80, IR: 0.263 },
        { proc: "E", ti: 6, tf: 26, t: 5, T: 20, E: 15, IP: 4.00, IR: 0.250 }
      ],
      averages: { T: 16.0, E: 10.8, IP: 3.16, IR: 0.338 }
    },

    rr: {
      name: "Round Robin (q = 2)",
      exec: ["A", "C", "C", "B", "B", "A", "A", "C", "D", "D", "E", "E", "B", "B", "A", "A", "C", "C", "D", "D", "E", "A", "D", "C", "E", "E"],
      ready: [
        ["A", "C"], ["C"], ["B", "A"], ["B", "A"], ["A", "C"], ["A", "C", "D"], ["C", "D", "E"], ["C", "D", "E"],
        ["D", "E", "B"], ["E", "B", "A"], ["E", "B", "A", "C", "D"], ["B", "A", "C", "D", "E"], ["A", "C", "D", "E"], ["C", "D", "E", "A"],
        ["D", "E", "A"], ["E", "A", "D"], ["A", "D", "C"], ["D", "C"], ["C", "E"], ["E"], ["A", "D", "C"], ["D", "C", "E"],
        ["C", "E"], ["E"], ["E"], []
      ],
      io: [
        [], ["A"], [], ["C"], ["B"], ["B"], ["B", "A"], ["A", "C"], [], [], [], [], [], [], [], [], [], [], [], ["E"], ["E"], [], [], [], [], []
      ],
      metrics: [
        { proc: "A", ti: 0, tf: 22, t: 6, T: 22, E: 16, IP: 3.67, IR: 0.273 },
        { proc: "B", ti: 2, tf: 14, t: 4, T: 12, E: 8, IP: 3.00, IR: 0.333 },
        { proc: "C", ti: 0, tf: 24, t: 6, T: 24, E: 18, IP: 4.00, IR: 0.250 },
        { proc: "D", ti: 5, tf: 23, t: 5, T: 18, E: 13, IP: 3.60, IR: 0.278 },
        { proc: "E", ti: 6, tf: 26, t: 5, T: 20, E: 15, IP: 4.00, IR: 0.250 }
      ],
      averages: { T: 19.2, E: 14.0, IP: 3.65, IR: 0.277 }
    },

    priority: {
      name: "Prioridad Apropiativa (3 > 2 > 1 > 0)",
      exec: ["C", "C", "B", "B", "C", "B", "D", "D", "D", "D", "D", "C", "B", "E", "E", "C", "E", "A", "A", "E", "A", "A", "A", "A"],
      ready: [
        ["A", "C"], ["A", "C"], ["A", "B"], ["A", "B", "C"], ["A", "B"], ["A", "D"], ["A", "E", "C"], ["A", "E", "C", "B"],
        ["A", "E", "C", "B"], ["A", "E", "B"], ["A", "E"], ["A", "C", "E"], ["A", "E"], ["A"], ["A", "E"], ["A"], ["A"],
        ["A"], ["A"], ["A"], [], [], [], []
      ],
      io: [
        [], [], ["C"], [], ["C"], ["C", "B"], ["B"], [], [], [], ["C"], ["C"], [], [], ["E"], ["A", "E"], ["A"], [], [], [], [], [], [], []
      ],
      metrics: [
        { proc: "A", ti: 0, tf: 29, t: 6, T: 29, E: 23, IP: 4.83, IR: 0.207 },
        { proc: "B", ti: 2, tf: 14, t: 4, T: 12, E: 8, IP: 3.00, IR: 0.333 },
        { proc: "C", ti: 0, tf: 16, t: 6, T: 16, E: 10, IP: 2.67, IR: 0.375 },
        { proc: "D", ti: 5, tf: 10, t: 5, T: 5, E: 0, IP: 1.00, IR: 1.000 },
        { proc: "E", ti: 6, tf: 22, t: 5, T: 16, E: 11, IP: 3.20, IR: 0.313 }
      ],
      averages: { T: 15.6, E: 10.4, IP: 2.94, IR: 0.446 }
    },

    hrn: {
      name: "HRN (Highest Response Ratio Next - No Apropiativo)",
      exec: ["A", "C", "C", "A", "A", "B", "B", "C", "E", "E", "A", "A", "B", "B", "C", "C", "D", "D", "D", "D", "D", "E", "E", "C"],
      ready: [
        ["A", "C"], ["C"], ["B", "A"], ["B", "A"], ["B", "C"], ["B", "C", "D"], ["C", "D", "E"], ["C", "D", "E", "A"],
        ["D", "E", "A"], ["D", "E", "A", "B"], ["D", "A", "B", "C"], ["D", "A", "B", "C"], ["D", "B", "C", "E"], ["D", "B", "C", "E"],
        ["D", "C", "E"], ["D", "E"], ["E", "C"], ["E", "C"], ["C"], ["C"], ["C"], ["E"], ["E"], []
      ],
      io: [
        [], ["A"], [], [], ["A"], ["A"], ["B"], ["B", "C"], [], ["E"], [], [], [], ["C"], [], [], [], [], [], [], [], ["C"], [], []
      ],
      metrics: [
        { proc: "A", ti: 0, tf: 14, t: 6, T: 14, E: 8, IP: 2.33, IR: 0.429 },
        { proc: "B", ti: 2, tf: 16, t: 4, T: 14, E: 10, IP: 3.50, IR: 0.286 },
        { proc: "C", ti: 0, tf: 26, t: 6, T: 26, E: 20, IP: 4.33, IR: 0.231 },
        { proc: "D", ti: 5, tf: 23, t: 5, T: 18, E: 13, IP: 3.60, IR: 0.278 },
        { proc: "E", ti: 6, tf: 25, t: 5, T: 19, E: 14, IP: 3.80, IR: 0.263 }
      ],
      averages: { T: 20.8, E: 13.0, IP: 5.20, IR: 0.330 }
    }
  };

  // ==========================================
  // 2. ESTADO GENERAL DE LA APLICACIÓN
  // ==========================================
  let currentAlgoKey = "fcfs";
  let currentTick = 0;
  let isPlaying = false;
  let simTimer = null;
  let simSpeed = 1000; // ms por tick

  const STORAGE_KEY = "TSO_2026_TP3_STATE";

  let appState = {
    student: {
      name: "",
      dni: "",
      career: "Ingeniería Informática / Lic. en Sistemas",
      github_user: ""
    },
    answers: {
      ej1_mecanismos_vs_politicas_metricas: {},
      ej2_fcfs_convoy: {},
      ej3_sjn_no_apropiativo: {},
      ej4_srt_apropiativo: {},
      ej5_round_robin: {},
      ej6_prioridad_apropiativa: {},
      ej7_hrn_algoritmo: {},
      ej8_matriz_comparativa_multicriterio: {},
      ej9_planificacion_multiprocesadores: {},
      ej10_evaluacion_seleccion_politicas: {}
    }
  };

  // Recuperar localStorage si existe
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = json_safe_parse(saved);
      if (parsed) appState = parsed;
    } catch (e) {
      console.warn("Error al cargar estado previo:", e);
    }
  }

  function json_safe_parse(str) {
    try { return JSON.parse(str); } catch (e) { return null; }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    updateProgressUI();
  }

  // ==========================================
  // 3. APEXCHARTS DASHBOARD COMPARATIVO
  // ==========================================
  let apexChart = null;

  function initApexChart() {
    const chartContainer = document.querySelector("#comparison-chart");
    if (!chartContainer || typeof ApexCharts === "undefined") return;

    const options = {
      series: [
        {
          name: "Tiempo Medio de Espera (E)",
          data: [13.0, 10.8, 10.8, 14.0, 10.4, 13.0]
        },
        {
          name: "Tiempo Medio de Retorno (T)",
          data: [18.2, 16.0, 16.0, 19.2, 15.6, 20.8]
        }
      ],
      chart: {
        type: "bar",
        height: 280,
        background: "transparent",
        toolbar: { show: false }
      },
      colors: ["#f59e0b", "#3b82f6"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          borderRadius: 4
        }
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: {
        categories: ["FCFS", "SJN", "SRT", "RR (q=2)", "Prioridad", "HRN"],
        labels: { style: { colors: "#94a3b8", fontSize: "11px", fontWeight: 600 } }
      },
      yaxis: {
        title: { text: "Ticks de CPU", style: { color: "#64748b" } },
        labels: { style: { colors: "#94a3b8" } }
      },
      theme: { mode: document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark" },
      legend: {
        position: "top",
        labels: { colors: "#94a3b8" }
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (val) => `${val} ticks`
        }
      }
    };

    apexChart = new ApexCharts(chartContainer, options);
    apexChart.render();
  }

  // ==========================================
  // 4. RENDERIZADO DEL KERNEL COCKPIT & GANTT
  // ==========================================
  const clockEl = document.querySelector("#system-clock");
  const cpuSocketEl = document.querySelector("#cpu-socket-content");
  const readyQueueEl = document.querySelector("#ready-queue-content");
  const ioBayEl = document.querySelector("#io-bay-content");
  const ganttGridEl = document.querySelector("#gantt-grid");
  const metricsBodyEl = document.querySelector("#metrics-table-body");
  const averagesRowEl = document.querySelector("#metrics-averages-row");

  function renderCockpitTick(tick) {
    const algo = SIMULATION_DATA[currentAlgoKey];
    if (!algo) return;

    if (clockEl) clockEl.textContent = `t = ${tick}`;

    const maxTicks = algo.exec.length;
    const currentProc = tick < maxTicks ? algo.exec[tick] : null;
    const readyList = tick < algo.ready.length ? algo.ready[tick] : [];
    const ioList = tick < algo.io.length ? algo.io[tick] : [];

    // 1. Zócalo CPU
    if (cpuSocketEl) {
      if (currentProc) {
        cpuSocketEl.innerHTML = `
          <div class="cpu-active-card">
            <div>
              <div style="font-weight:800; font-size:1.15rem; color:#10b981;">Proceso ${currentProc}</div>
              <div style="font-size:0.75rem; color:#94a3b8;">En Ejecución de CPU</div>
            </div>
            <div style="background:#10b981; color:#064e3b; font-weight:800; font-size:0.85rem; padding:4px 10px; border-radius:6px;">CPU BUSY</div>
          </div>
        `;
        if (window.anime) {
          anime({
            targets: cpuSocketEl.querySelector('.cpu-active-card'),
            scale: [0.96, 1],
            duration: 250,
            easing: 'easeOutElastic(1, .8)'
          });
        }
      } else {
        cpuSocketEl.innerHTML = `<div class="empty-placeholder">CPU en Reposo (Idle / Simulación Finalizada)</div>`;
      }
    }

    // 2. Cola de Listos (Ready Queue)
    if (readyQueueEl) {
      if (readyList.length > 0) {
        readyQueueEl.innerHTML = readyList.map(p => `
          <div class="pcb-chip ready-chip">
            <div class="pcb-title">Proc ${p} <span style="color:#f59e0b;">Listo</span></div>
            <div class="pcb-sub">Esperando CPU</div>
          </div>
        `).join("");
      } else {
        readyQueueEl.innerHTML = `<div class="empty-placeholder">Cola de listos vacía</div>`;
      }
    }

    // 3. Bahía de E/S (I/O Bay)
    if (ioBayEl) {
      if (ioList.length > 0) {
        ioBayEl.innerHTML = ioList.map(p => `
          <div class="pcb-chip io-chip">
            <div class="pcb-title">Proc ${p} <span style="color:#f97316;">E/S</span></div>
            <div class="pcb-sub">En Bloqueo</div>
          </div>
        `).join("");
      } else {
        ioBayEl.innerHTML = `<div class="empty-placeholder">Sin dispositivos activos</div>`;
      }
    }

    // 4. Actualizar Gantt
    renderGanttGrid(tick);
  }

  function renderGanttGrid(upToTick = 30) {
    if (!ganttGridEl) return;
    const algo = SIMULATION_DATA[currentAlgoKey];
    if (!algo) return;

    const procs = ["A", "B", "C", "D", "E"];
    const totalCols = 30;

    let html = ``;

    // Header Row: Tiempo 0..29
    html += `<div class="gantt-header-cell">Proc</div>`;
    for (let t = 0; t < totalCols; t++) {
      const isCurrent = (t === upToTick);
      html += `<div class="gantt-header-cell ${isCurrent ? 'current-tick-header' : ''}" style="${isCurrent ? 'color:#38bdf8; font-weight:800; border:1px solid #0284c7;' : ''}">${t}</div>`;
    }

    // Rows for each process
    procs.forEach(p => {
      html += `<div class="gantt-row-label">Proceso ${p}</div>`;
      for (let t = 0; t < totalCols; t++) {
        let cellClass = "cell-idle";
        let cellText = "";

        if (t <= upToTick) {
          const isCpu = t < algo.exec.length && algo.exec[t] === p;
          const isIo = t < algo.io.length && algo.io[t].includes(p);
          const isWait = t < algo.ready.length && algo.ready[t].includes(p);

          if (isCpu) {
            cellClass = "cell-cpu";
            cellText = "CPU";
          } else if (isIo) {
            cellClass = "cell-io";
            cellText = "E/S";
          } else if (isWait) {
            cellClass = "cell-wait";
            cellText = "E";
          }
        }

        html += `<div class="gantt-cell ${cellClass}">${cellText}</div>`;
      }
    });

    ganttGridEl.innerHTML = html;
  }

  function renderMetricsTable() {
    const algo = SIMULATION_DATA[currentAlgoKey];
    if (!algo || !metricsBodyEl) return;

    metricsBodyEl.innerHTML = algo.metrics.map(m => `
      <tr>
        <td><strong>${m.proc}</strong></td>
        <td>${m.ti}</td>
        <td>${m.tf}</td>
        <td>${m.t}</td>
        <td>${m.T}</td>
        <td>${m.E}</td>
        <td>${m.IP.toFixed(2)}</td>
        <td>${m.IR.toFixed(3)}</td>
      </tr>
    `).join("");

    if (averagesRowEl) {
      averagesRowEl.innerHTML = `
        <td colspan="4" style="text-align:right;"><strong>Promedios Oficiales:</strong></td>
        <td><strong>${algo.averages.T.toFixed(1)}</strong></td>
        <td><strong>${algo.averages.E.toFixed(1)}</strong></td>
        <td><strong>${algo.averages.IP.toFixed(2)}</strong></td>
        <td><strong>${algo.averages.IR.toFixed(3)}</strong></td>
      `;
    }
  }

  // ==========================================
  // 5. CONTROLES DEL REPRODUCTOR DE SIMULACIÓN
  // ==========================================
  const btnPlay = document.querySelector("#btn-sim-play");
  const btnPause = document.querySelector("#btn-sim-pause");
  const btnStep = document.querySelector("#btn-sim-step");
  const btnReset = document.querySelector("#btn-sim-reset");
  const speedSlider = document.querySelector("#sim-speed-slider");
  const speedLabel = document.querySelector("#speed-label");

  function playSimulation() {
    if (isPlaying) return;
    isPlaying = true;
    if (btnPlay) btnPlay.style.display = "none";
    if (btnPause) btnPause.style.display = "inline-flex";

    simTimer = setInterval(() => {
      const maxTicks = SIMULATION_DATA[currentAlgoKey].exec.length;
      if (currentTick < maxTicks) {
        renderCockpitTick(currentTick);
        currentTick++;
      } else {
        pauseSimulation();
      }
    }, simSpeed);
  }

  function pauseSimulation() {
    isPlaying = false;
    clearInterval(simTimer);
    if (btnPlay) btnPlay.style.display = "inline-flex";
    if (btnPause) btnPause.style.display = "none";
  }

  function resetSimulation() {
    pauseSimulation();
    currentTick = 0;
    renderCockpitTick(0);
  }

  function stepSimulation() {
    pauseSimulation();
    const maxTicks = SIMULATION_DATA[currentAlgoKey].exec.length;
    if (currentTick < maxTicks) {
      renderCockpitTick(currentTick);
      currentTick++;
    }
  }

  if (btnPlay) btnPlay.addEventListener("click", playSimulation);
  if (btnPause) btnPause.addEventListener("click", pauseSimulation);
  if (btnStep) btnStep.addEventListener("click", stepSimulation);
  if (btnReset) btnReset.addEventListener("click", resetSimulation);

  if (speedSlider) {
    speedSlider.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      simSpeed = Math.round(1000 / val);
      if (speedLabel) speedLabel.textContent = `${val}x`;
      if (isPlaying) {
        pauseSimulation();
        playSimulation();
      }
    });
  }

  // Selector de Algoritmos (Pills)
  const algoPills = document.querySelectorAll(".algo-pill-btn");
  algoPills.forEach(pill => {
    pill.addEventListener("click", () => {
      algoPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentAlgoKey = pill.getAttribute("data-algo");
      resetSimulation();
      renderMetricsTable();
    });
  });

  // ==========================================
  // 6. INTERACCIÓN DE LOS 10 EJERCICIOS
  // ==========================================

  // SortableJS Drag & Drop: Kanban (Ej 1) y Cintas Horizontales (Ej 2 y Ej 5)
  function initSortableWidgets() {
    if (typeof Sortable === "undefined") {
      console.warn("SortableJS no está disponible.");
      return;
    }

    // 1. Kanban Dual Container (Ejercicio 1)
    const bucketMecanismo = document.querySelector("#kanban-bucket-mecanismo");
    const bucketPolitica = document.querySelector("#kanban-bucket-politica");
    const bucketUnassigned = document.querySelector("#kanban-bucket-unassigned");

    function onKanbanChange() {
      if (!appState.answers.ej1_mecanismos_vs_politicas_metricas) {
        appState.answers.ej1_mecanismos_vs_politicas_metricas = {};
      }
      bucketMecanismo?.querySelectorAll(".kanban-card").forEach(card => {
        const itemKey = card.getAttribute("data-item");
        if (itemKey) appState.answers.ej1_mecanismos_vs_politicas_metricas[itemKey] = "mecanismo";
      });
      bucketPolitica?.querySelectorAll(".kanban-card").forEach(card => {
        const itemKey = card.getAttribute("data-item");
        if (itemKey) appState.answers.ej1_mecanismos_vs_politicas_metricas[itemKey] = "politica";
      });
      bucketUnassigned?.querySelectorAll(".kanban-card").forEach(card => {
        const itemKey = card.getAttribute("data-item");
        if (itemKey) delete appState.answers.ej1_mecanismos_vs_politicas_metricas[itemKey];
      });
      saveState();
    }

    const kanbanConfig = {
      group: "kanban_ej1",
      animation: 200,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      onEnd: onKanbanChange,
      onAdd: onKanbanChange
    };

    if (bucketMecanismo) new Sortable(bucketMecanismo, kanbanConfig);
    if (bucketPolitica) new Sortable(bucketPolitica, kanbanConfig);
    if (bucketUnassigned) new Sortable(bucketUnassigned, kanbanConfig);

    // 2. Cinta Horizontal FCFS (Ejercicio 2)
    const fcfsStrip = document.querySelector("#sortable-fcfs-order");
    const fcfsDisplay = document.querySelector("#fcfs-order-display");
    if (fcfsStrip) {
      new Sortable(fcfsStrip, {
        animation: 250,
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        onEnd: () => {
          const procs = Array.from(fcfsStrip.children).map(c => c.getAttribute("data-proc"));
          const orderStr = procs.join("-");
          if (!appState.answers.ej2_fcfs_convoy) appState.answers.ej2_fcfs_convoy = {};
          appState.answers.ej2_fcfs_convoy.final_order = orderStr;
          if (fcfsDisplay) fcfsDisplay.textContent = procs.map(p => p.toUpperCase()).join(" ➔ ");
          saveState();
        }
      });
    }

    // 3. Cinta Horizontal Round Robin (Ejercicio 5)
    const rrStrip = document.querySelector("#sortable-rr-order");
    const rrDisplay = document.querySelector("#rr-order-display");
    if (rrStrip) {
      new Sortable(rrStrip, {
        animation: 250,
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        onEnd: () => {
          const procs = Array.from(rrStrip.children).map(c => c.getAttribute("data-proc"));
          const orderStr = procs.join("-");
          if (!appState.answers.ej5_round_robin) appState.answers.ej5_round_robin = {};
          appState.answers.ej5_round_robin.final_order = orderStr;
          if (rrDisplay) rrDisplay.textContent = procs.map(p => p.toUpperCase()).join(" ➔ ");
          saveState();
        }
      });
    }
  }

  // Switches segmentados (Ej 3, Ej 7, Ej 9, etc.)
  document.querySelectorAll(".segmented-control").forEach(control => {
    const exId = control.getAttribute("data-ex");
    const itemKey = control.getAttribute("data-item");

    control.querySelectorAll(".segment-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        control.querySelectorAll(".segment-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const val = btn.getAttribute("data-value");
        if (!appState.answers[exId]) appState.answers[exId] = {};
        appState.answers[exId][itemKey] = val;
        saveState();
      });
    });
  });

  // Radio cards estructuradas
  document.querySelectorAll(".radio-card").forEach(card => {
    card.addEventListener("click", () => {
      const parentGrid = card.closest(".radio-cards-grid");
      const exId = parentGrid.getAttribute("data-ex");
      const itemKey = parentGrid.getAttribute("data-item") || "root";
      const val = card.getAttribute("data-val");

      parentGrid.querySelectorAll(".radio-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      if (!appState.answers[exId]) appState.answers[exId] = {};
      if (itemKey === "root") {
        appState.answers[exId] = val;
      } else {
        appState.answers[exId][itemKey] = val;
      }
      saveState();
    });
  });

  // Custom Selects normalizados
  document.querySelectorAll(".custom-select").forEach(select => {
    select.addEventListener("change", () => {
      const exId = select.getAttribute("data-ex");
      const itemKey = select.getAttribute("data-item");
      const val = select.value;

      if (!appState.answers[exId]) appState.answers[exId] = {};
      appState.answers[exId][itemKey] = val;
      saveState();
    });
  });

  // ==========================================
  // 7. RESTAURACIÓN DE ESTADO EN INTERFAZ
  // ==========================================
  function restoreUIFromState() {
    // Restaurar campos de estudiante
    const studentInputs = {
      name: document.querySelector("#student-name"),
      dni: document.querySelector("#student-dni"),
      career: document.querySelector("#student-career"),
      github_user: document.querySelector("#student-github")
    };
    for (const [key, el] of Object.entries(studentInputs)) {
      if (el && appState.student[key]) el.value = appState.student[key];
    }

    // Restaurar Kanban Ejercicio 1
    const ansEj1 = appState.answers.ej1_mecanismos_vs_politicas_metricas || {};
    const bMec = document.querySelector("#kanban-bucket-mecanismo");
    const bPol = document.querySelector("#kanban-bucket-politica");
    const bUnass = document.querySelector("#kanban-bucket-unassigned");

    document.querySelectorAll(".kanban-card").forEach(card => {
      const itemKey = card.getAttribute("data-item");
      const val = ansEj1[itemKey];
      if (val === "mecanismo" && bMec) {
        bMec.appendChild(card);
      } else if (val === "politica" && bPol) {
        bPol.appendChild(card);
      } else if (bUnass) {
        bUnass.appendChild(card);
      }
    });

    // Restaurar cinta FCFS (Ejercicio 2)
    const savedFcfsOrder = appState.answers.ej2_fcfs_convoy?.final_order;
    const fcfsStrip = document.querySelector("#sortable-fcfs-order");
    const fcfsDisplay = document.querySelector("#fcfs-order-display");
    if (savedFcfsOrder && fcfsStrip) {
      const orderList = savedFcfsOrder.toLowerCase().split("-");
      orderList.forEach(proc => {
        const card = fcfsStrip.querySelector(`.sortable-proc-card[data-proc="${proc}"]`);
        if (card) fcfsStrip.appendChild(card);
      });
      if (fcfsDisplay) fcfsDisplay.textContent = orderList.map(p => p.toUpperCase()).join(" ➔ ");
    }

    // Restaurar cinta RR (Ejercicio 5)
    const savedRrOrder = appState.answers.ej5_round_robin?.final_order;
    const rrStrip = document.querySelector("#sortable-rr-order");
    const rrDisplay = document.querySelector("#rr-order-display");
    if (savedRrOrder && rrStrip) {
      const orderList = savedRrOrder.toLowerCase().split("-");
      orderList.forEach(proc => {
        const card = rrStrip.querySelector(`.sortable-proc-card[data-proc="${proc}"]`);
        if (card) rrStrip.appendChild(card);
      });
      if (rrDisplay) rrDisplay.textContent = orderList.map(p => p.toUpperCase()).join(" ➔ ");
    }

    // Restaurar switches segmentados
    document.querySelectorAll(".segmented-control").forEach(control => {
      const exId = control.getAttribute("data-ex");
      const itemKey = control.getAttribute("data-item");
      const savedVal = appState.answers[exId]?.[itemKey];
      if (savedVal) {
        control.querySelectorAll(".segment-btn").forEach(btn => {
          if (btn.getAttribute("data-value") === savedVal) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
      }
    });

    // Restaurar radio cards
    document.querySelectorAll(".radio-cards-grid").forEach(grid => {
      const exId = grid.getAttribute("data-ex");
      const itemKey = grid.getAttribute("data-item") || "root";
      const savedVal = itemKey === "root" ? appState.answers[exId] : appState.answers[exId]?.[itemKey];
      if (savedVal) {
        grid.querySelectorAll(".radio-card").forEach(card => {
          if (card.getAttribute("data-val") === savedVal) {
            card.classList.add("selected");
          } else {
            card.classList.remove("selected");
          }
        });
      }
    });

    // Restaurar selects
    document.querySelectorAll(".custom-select").forEach(select => {
      const exId = select.getAttribute("data-ex");
      const itemKey = select.getAttribute("data-item");
      const savedVal = appState.answers[exId]?.[itemKey];
      if (savedVal) {
        select.value = savedVal;
      }
    });

    updateProgressUI();
  }

  // ==========================================
  // 8. CÁLCULO DE PROGRESO Y GAMIFICACIÓN
  // ==========================================
  const progressBar = document.querySelector("#progress-bar");
  const progressText = document.querySelector("#progress-percentage");
  const btnExport = document.querySelector("#btn-export-json");

  function isExerciseComplete(exId) {
    const ans = appState.answers[exId];
    if (!ans) return false;

    // Reglas de completitud por ejercicio
    const requiredKeys = {
      ej1_mecanismos_vs_politicas_metricas: ["ctx_switch", "queue_management", "priority_decision", "quantum_sizing", "metric_turnaround", "metric_waiting", "metric_service_index", "metric_throughput", "metric_cpu_util"],
      ej2_fcfs_convoy: ["final_order", "best_process", "worst_process", "convoy_cause"],
      ej3_sjn_no_apropiativo: ["dispatch_t0", "dispatch_t1", "preemption_behavior", "avg_wait_time"],
      ej4_srt_apropiativo: ["preemption_condition", "overhead_tradeoff", "workload_comparison", "starvation_risk"],
      ej5_round_robin: ["quantum_expiration", "tie_breaker_order", "final_order", "quantum_impact_large"],
      ej6_prioridad_apropiativa: ["priority_scale", "first_dispatched", "preemption_event", "starvation_solution"],
      ej7_hrn_algoritmo: ["formula_definition", "preemption_type", "starvation_behavior", "first_finished"],
      ej8_matriz_comparativa_multicriterio: ["min_avg_wait", "max_fairness_interactive", "highest_wait_c", "overall_most_penalized"],
      ej9_planificacion_multiprocesadores: ["resource_contention", "processor_affinity", "load_balancing"],
      ej10_evaluacion_seleccion_politicas: ["golden_rule", "interactive_system", "batch_throughput", "context_switch_cost"]
    };

    const keys = requiredKeys[exId];
    if (!keys) return false;
    return keys.every(k => ans[k] !== undefined && ans[k] !== "");
  }

  function updateProgressUI() {
    const exercises = [
      "ej1_mecanismos_vs_politicas_metricas",
      "ej2_fcfs_convoy",
      "ej3_sjn_no_apropiativo",
      "ej4_srt_apropiativo",
      "ej5_round_robin",
      "ej6_prioridad_apropiativa",
      "ej7_hrn_algoritmo",
      "ej8_matriz_comparativa_multicriterio",
      "ej9_planificacion_multiprocesadores",
      "ej10_evaluacion_seleccion_politicas"
    ];

    let completedCount = 0;
    exercises.forEach((exId, idx) => {
      const card = document.querySelector(`#card-${exId}`);
      const badge = card?.querySelector(".ex-badge");
      const done = isExerciseComplete(exId);

      if (done) {
        completedCount++;
        if (badge) {
          badge.className = "ex-badge completed";
          badge.textContent = "✓ Completado";
        }
      } else {
        if (badge) {
          badge.className = "ex-badge pending";
          badge.textContent = "Pendiente";
        }
      }
    });

    const pct = Math.round((completedCount / exercises.length) * 100);
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressText) progressText.textContent = `${pct}% (${completedCount}/10 completados)`;

    if (btnExport) {
      if (pct === 100) {
        btnExport.removeAttribute("disabled");
        if (typeof confetti === "function" && !appState._celebrated) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
          appState._celebrated = true;
        }
      } else {
        btnExport.setAttribute("disabled", "true");
      }
    }
  }

  // ==========================================
  // 9. EXPORTAR E IMPORTAR JSON
  // ==========================================
  if (btnExport) {
    btnExport.addEventListener("click", () => {
      // Tomar metadatos de estudiante
      appState.student.name = document.querySelector("#student-name")?.value.trim() || "";
      appState.student.dni = document.querySelector("#student-dni")?.value.trim() || "";
      appState.student.career = document.querySelector("#student-career")?.value.trim() || "Ingeniería Informática / Lic. en Sistemas";
      appState.student.github_user = document.querySelector("#student-github")?.value.trim() || "";

      if (!appState.student.name || !appState.student.dni) {
        alert("Por favor, completa tu Nombre y DNI/Legajo en el encabezado antes de exportar.");
        document.querySelector("#student-name")?.focus();
        return;
      }

      const exportPayload = {
        tp_metadata: {
          tp_id: "TSO-2026-TP3",
          title: "TP N° 3: Algoritmos de Planificación de CPU",
          catedra: "Teoría de Sistemas Operativos - UNJu Facultad de Ingeniería",
          submitted_at: new Date().toISOString()
        },
        student: appState.student,
        answers: appState.answers
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "respuestas_tp3.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  // Input listener para datos de estudiante
  ["student-name", "student-dni", "student-career", "student-github"].forEach(id => {
    const el = document.querySelector(`#${id}`);
    if (el) {
      el.addEventListener("input", (e) => {
        const field = id.replace("student-", "").replace("github", "github_user");
        appState.student[field] = e.target.value.trim();
        saveState();
      });
    }
  });

  // Importar JSON
  const btnImport = document.querySelector("#btn-import-json");
  const fileInput = document.querySelector("#file-import-input");

  if (btnImport && fileInput) {
    btnImport.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported.student && imported.answers) {
            appState.student = imported.student;
            appState.answers = imported.answers;
            saveState();
            restoreUIFromState();
            alert("¡Respuestas importadas y restauradas con éxito!");
          } else {
            alert("El archivo no tiene el formato válido de respuestas_tp3.json.");
          }
        } catch (err) {
          alert("Error al leer el archivo JSON: " + err.message);
        }
      };
      reader.readAsText(file);
    });
  }

  // ==========================================
  // 10. TEMA DARK / LIGHT MODE
  // ==========================================
  const themeToggleBtn = document.querySelector("#theme-toggle-btn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("TSO_THEME", newTheme);
      if (apexChart) {
        apexChart.updateOptions({ theme: { mode: newTheme } });
      }
    });

    const savedTheme = localStorage.getItem("TSO_THEME");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }

  // ==========================================
  // 11. MODALES Y GUÍAS BIBLIOGRÁFICAS
  // ==========================================
  const modalGit = document.querySelector("#modal-git");
  const btnGitGuide = document.querySelector("#btn-git-guide");
  const modalBiblio = document.querySelector("#modal-biblio");
  const btnBiblioAll = document.querySelector("#btn-open-biblio-all");

  if (btnGitGuide && modalGit) {
    btnGitGuide.addEventListener("click", () => modalGit.classList.add("active"));
  }
  if (btnBiblioAll && modalBiblio) {
    btnBiblioAll.addEventListener("click", () => modalBiblio.classList.add("active"));
  }

  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal-backdrop").classList.remove("active");
    });
  });

  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) backdrop.classList.remove("active");
    });
  });

  // ==========================================
  // INICIALIZACIÓN FINAL
  // ==========================================
  renderCockpitTick(0);
  renderMetricsTable();
  initApexChart();
  initSortableWidgets();
  restoreUIFromState();
});

