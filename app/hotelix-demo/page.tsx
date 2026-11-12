
"use client";

import { useState } from "react";
import styles from "./hotelix-demo.module.css";

type RecordItem = {
  date: string;
  revenue: number;
  expenses: number;
  other_income: number;
  occupancy_pct: number;
  bookings: number;
  rooms_sold: number;
  rooms_available: number;
  notes: string;
};

type ForecastItem = {
  date: string;
  revenue: number;
  occupancy: number;
};

const initialRecords: RecordItem[] = [];

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function HotelixDemo() {
  const [records, setRecords] = useState<RecordItem[]>(initialRecords);
  const [activePage, setActivePage] = useState("Overview");
  const [forecastTab, setForecastTab] = useState("Revenue");
  const [forecastDays, setForecastDays] = useState(7);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const [forecastResults, setForecastResults] = useState<
    ForecastItem[] | null
  >(null);

  const [training, setTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [csvMessage, setCsvMessage] = useState("");

  const latest = records[records.length - 1];

  const maxChart = Math.max(
    ...records.slice(-30).map((r) => r.revenue),
    ...records.slice(-30).map((r) => r.expenses),
    1
  );

  // Save or update daily hotel data
  function saveRecord(formData: FormData) {
    const item: RecordItem = {
      date: String(formData.get("date")),
      revenue: Number(formData.get("revenue")),
      expenses: Number(formData.get("expenses")),
      other_income: Number(formData.get("other_income")),
      occupancy_pct: Number(formData.get("occupancy_pct")),
      bookings: Number(formData.get("bookings")),
      rooms_sold: Number(formData.get("rooms_sold")),
      rooms_available: Number(formData.get("rooms_available")),
      notes: String(formData.get("notes") || ""),
    };

    setRecords((old) => {
      const exists = old.some((r) => r.date === item.date);

      return exists
        ? old.map((r) => (r.date === item.date ? item : r))
        : [...old, item].sort((a, b) =>
            a.date.localeCompare(b.date)
          );
    });

    setForecastResults(null);
    setActivePage("Overview");
  }

  // Generate illustrative forecast from entered records
  function generateForecast() {
    if (records.length < 3) {
      alert(
        "Please enter at least 3 daily records to generate a demo forecast."
      );

  const chartValues =
    forecastResults?.map((item) =>
      forecastTab === "Revenue" ? item.revenue : item.occupancy
    ) ?? [];

  const chartMin = Math.min(...chartValues, 0);
  const chartMax = Math.max(...chartValues, 1);
  const chartRange = Math.max(chartMax - chartMin, 1);

  const chartPoints = chartValues.map((value, index) => ({
    x: 50 + (index / Math.max(chartValues.length - 1, 1)) * 900,
    y: 250 - ((value - chartMin) / chartRange) * 200,
    value,
  }));

  const chartLine = chartPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

      return;
    }

    const recent = records.slice(-7);

    const avgRevenue =
      recent.reduce((sum, item) => sum + item.revenue, 0) /
      recent.length;

    const avgOccupancy =
      recent.reduce((sum, item) => sum + item.occupancy_pct, 0) /
      recent.length;

    const results: ForecastItem[] = Array.from(
      { length: forecastDays },
      (_, i) => {
        const variation = 1 + Math.sin(i * 1.7) * 0.12;

        const date = new Date();
        date.setDate(date.getDate() + i + 1);

        return {
          date: date.toISOString().slice(0, 10),
          revenue: Math.round(avgRevenue * variation),
          occupancy: Math.min(
            100,
            Math.max(
              0,
              Number((avgOccupancy * variation).toFixed(1))
            )
          ),
        };
      }
    );

    setForecastResults(results);
  }

  // Import CSV
  function importCSV(file?: File) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const lines = String(reader.result)
          .trim()
          .split(/\r?\n/);

        if (lines.length < 2) {
          setCsvMessage("CSV file contains no records.");
          return;
        }

        const headers = lines[0]
          .split(",")
          .map((h) => h.trim().replace(/^"|"$/g, ""));

        const required = [
          "date",
          "revenue",
          "expenses",
          "occupancy_pct",
        ];

        const missing = required.filter(
          (key) => !headers.includes(key)
        );

        if (missing.length > 0) {
          setCsvMessage(
            `Missing required columns: ${missing.join(", ")}`
          );
          return;
        }

        const imported: RecordItem[] = lines
          .slice(1)
          .filter((line) => line.trim())
          .map((line) => {
            const values = line.split(",");

            const get = (key: string) =>
              values[headers.indexOf(key)]?.trim().replace(/^"|"$/g, "") || "";

            return {
              date: get("date"),
              revenue: Number(get("revenue")) || 0,
              expenses: Number(get("expenses")) || 0,
              other_income: Number(get("other_income")) || 0,
              occupancy_pct: Number(get("occupancy_pct")) || 0,
              bookings: Number(get("bookings")) || 0,
              rooms_sold: Number(get("rooms_sold")) || 0,
              rooms_available: Number(get("rooms_available")) || 0,
              notes: get("notes"),
            };
          })
          .filter(
            (r) =>
              /^\d{4}-\d{2}-\d{2}$/.test(r.date) &&
              Number.isFinite(r.revenue) &&
              Number.isFinite(r.expenses) &&
              Number.isFinite(r.occupancy_pct) &&
              r.occupancy_pct >= 0 &&
              r.occupancy_pct <= 100
          );

        if (imported.length === 0) {
          setCsvMessage("No valid records found in this CSV file.");
          return;
        }

        setRecords((old) => {
          const map = new Map(
            old.map((r) => [r.date, r])
          );

          imported.forEach((r) => map.set(r.date, r));

          return Array.from(map.values()).sort((a, b) =>
            a.date.localeCompare(b.date)
          );
        });

        setForecastResults(null);
        setCsvMessage(
          `${imported.length} records imported successfully.`
        );
      } catch {
        setCsvMessage("Unable to read this CSV file.");
      }
    };

    reader.readAsText(file);
  }

  // Export records to CSV
  function exportCSV() {
    if (records.length === 0) {
      alert("No records available to export.");
      return;
    }

    const headers = [
      "date",
      "revenue",
      "expenses",
      "other_income",
      "occupancy_pct",
      "bookings",
      "rooms_sold",
      "rooms_available",
      "notes",
    ];

    const rows = records.map((r) =>
      headers
        .map((h) =>
          JSON.stringify(r[h as keyof RecordItem] ?? "")
        )
        .join(",")
    );

    const blob = new Blob(
      [[headers.join(","), ...rows].join("\n")],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "hotelix-demo-data.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  // Simulated model training animation
  function trainModel() {
    if (training) return;

    setTraining(true);
    setTrainingProgress(0);

    let progress = 0;

    const timer = window.setInterval(() => {
      progress += 5;
      setTrainingProgress(progress);

      if (progress >= 100) {
        window.clearInterval(timer);
        setTraining(false);
      }
    }, 140);
  }

  // Reset demo
  function resetDemo() {
    setRecords([]);
    setForecastResults(null);
    setCsvMessage("");
    setTrainingProgress(0);
    setForecastDays(7);
    setForecastTab("Revenue");
    setActivePage("Overview");
  }

  const chartValues = (forecastResults ?? []).map((item) =>
    forecastTab === "Revenue" ? item.revenue : item.occupancy
  );

  const chartMin = Math.min(...chartValues, 0);
  const chartMax = Math.max(...chartValues, 1);
  const chartRange = Math.max(chartMax - chartMin, 1);

  const chartPoints = chartValues.map((value, index) => ({
    x: 50 + (index / Math.max(chartValues.length - 1, 1)) * 900,
    y: 250 - ((value - chartMin) / chartRange) * 200,
    value,
  }));

  const chartLine = chartPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
   


  return (
    <main className={styles.app}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          🏨 Hotelix workspace
        </div>

        <p className={styles.sideNote}>
          Interactive product preview
          <br />
          Local browser simulation
        </p>

        <p className={styles.navTitle}>NAVIGATE</p>

        {[
          "Overview",
          "Daily entry",
          "CSV import / export",
          "Forecasts & insights",
          "MLOps status",
        ].map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`${styles.navButton} ${
              activePage === page ? styles.active : ""
            }`}
          >
            <span className={styles.navDot} />
            {page}
          </button>
        ))}

        <button
          className={styles.resetButton}
          onClick={resetDemo}
        >
          ↻ Reset demo
        </button>

        <div className={styles.sidebarFooter}>
          <span>HOTELIX</span>
          <small>V1.2.0 · PUBLIC BETA</small>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className={styles.main}>
        <header className={styles.topbar}>
          <span>HAFSAAMU / HOTELIX / LIVE DEMO</span>
          <span className={styles.demoBadge}>
            ● DEMO MODE
          </span>
        </header>

        <div className={styles.content}>
          {/* PAGE HEADER */}
          <div className={styles.pageHeading}>
            <div>
              <h1>🏨 Hafsaamu Hotelix</h1>
              <p>
                Local hotel intelligence · MLOps · Your data stays on this computer
              </p>
            </div>

            <span className={styles.version}>V1.2.0</span>
          </div>

          {/* OVERVIEW */}
          {activePage === "Overview" && (
            <>
              <div className={styles.kpis}>
                <div className={styles.kpi}>
                  <span>Recorded days</span>
                  <strong>{records.length}</strong>
                  <small>Historical records</small>
                </div>

                <div className={styles.kpi}>
                  <span>Latest revenue</span>
                  <strong>{money(latest?.revenue || 0)}</strong>
                  <small>Most recent record</small>
                </div>

                <div className={styles.kpi}>
                  <span>Latest occupancy</span>
                  <strong>
                    {(latest?.occupancy_pct || 0).toFixed(1)}%
                  </strong>
                  <small>Room occupancy</small>
                </div>

                <div className={styles.kpi}>
                  <span>Latest net operating result</span>
                  <strong>
                    {money(
                      (latest?.revenue || 0) +
                        (latest?.other_income || 0) -
                        (latest?.expenses || 0)
                    )}
                  </strong>
                  <small>Revenue minus expenses</small>
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeading}>
                  <h2>Daily performance</h2>
                  <span>Last 30 records</span>
                </div>

                {records.length === 0 ? (
                  <div className={styles.emptyForecast}>
                    <div className={styles.emptyIcon}>⌁</div>
                    <h3>No hotel records yet.</h3>
                    <p>
                      Start by entering your daily hotel data or
                      importing historical records through CSV.
                    </p>
                    <button
                      className={styles.primaryButton}
                      onClick={() => setActivePage("Daily entry")}
                    >
                      + Add your first record
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={styles.chart}>
                      {records.slice(-30).map((r) => (
                        <div
                          className={styles.chartColumn}
                          key={r.date}
                          title={`${r.date} · Revenue ${money(
                            r.revenue
                          )} · Expenses ${money(r.expenses)}`}
                        >
                          <div
                            className={styles.barRevenue}
                            style={{
                              height: `${(r.revenue / maxChart) * 100}%`,
                            }}
                          />

                          <div
                            className={styles.barExpense}
                            style={{
                              height: `${(r.expenses / maxChart) * 100}%`,
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className={styles.legend}>
                      <span>
                        <i className={styles.legendExpense} />
                        Expenses
                      </span>
                      <span>
                        <i className={styles.legendRevenue} />
                        Revenue
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.section}>
                <div className={styles.sectionHeading}>
                  <h2>Recent records</h2>
                  <span>{records.length} total records</span>
                </div>

                {records.length === 0 ? (
                  <p className={styles.muted}>
                    Your saved daily records will appear here.
                  </p>
                ) : (
                  <div className={styles.tableWrap}>
                    <table>
                      <thead>
                        <tr>
                          {[
                            "Date",
                            "Revenue",
                            "Expenses",
                            "Occupancy",
                            "Bookings",
                            "Rooms sold",
                            "Rooms available",
                          ].map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {[...records]
                          .reverse()
                          .slice(0, 12)
                          .map((r) => (
                            <tr key={r.date}>
                              <td>{r.date}</td>
                              <td>{money(r.revenue)}</td>
                              <td>{money(r.expenses)}</td>
                              <td>{r.occupancy_pct}%</td>
                              <td>{r.bookings}</td>
                              <td>{r.rooms_sold}</td>
                              <td>{r.rooms_available}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* DAILY ENTRY */}
          {activePage === "Daily entry" && (
            <div className={styles.section}>
              <h2>Add or update a day</h2>

              <form action={saveRecord} className={styles.form}>
                <label>
                  Business date
                  <input
                    type="date"
                    name="date"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    required
                  />
                </label>

                <div className={styles.formGrid}>
                  {[
                    ["Revenue", "revenue"],
                    ["Expenses", "expenses"],
                    ["Other income", "other_income"],
                    ["Occupancy %", "occupancy_pct"],
                    ["Bookings", "bookings"],
                    ["Rooms sold", "rooms_sold"],
                    ["Rooms available", "rooms_available"],
                  ].map(([label, name]) => (
                    <label key={name}>
                      {label}
                      <input
                        name={name}
                        type="number"
                        min="0"
                        max={name === "occupancy_pct" ? "100" : undefined}
                        step="0.01"
                        defaultValue="0"
                        required
                      />
                    </label>
                  ))}
                </div>

                <label>
                  Notes (optional)
                  <textarea name="notes" rows={3} />
                </label>

                <button
                  className={styles.primaryButton}
                  type="submit"
                >
                  Save daily data
                </button>
              </form>
            </div>
          )}

          {/* CSV IMPORT / EXPORT */}
          {activePage === "CSV import / export" && (
            <div className={styles.section}>
              <h2>Historical data</h2>
              <p>
                Import your hotel records using a CSV file.
              </p>

              <div className={styles.uploadBox}>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(e) => importCSV(e.target.files?.[0])}
                />

                <small>CSV file · Browser-side processing</small>
              </div>

              {csvMessage && (
                <p className={styles.success}>{csvMessage}</p>
              )}

              <button
                className={styles.secondaryButton}
                onClick={exportCSV}
              >
                ↓ Download all hotel data (CSV)
              </button>

              <p className={styles.muted}>
                Date is used as the unique key. Matching dates are updated,
                not duplicated.
              </p>

              <p className={styles.muted}>
                Required columns: date, revenue, expenses, occupancy_pct.
                Other columns are optional.
              </p>
            </div>
          )}

          {/* FORECASTS */}
          {activePage === "Forecasts & insights" && (
            <div className={styles.section}>
              <h2>Hotel performance forecast</h2>

              <p>
                Generate a forward-looking illustrative view from your
                hotel's entered historical records.
              </p>

              <label className={styles.sliderLabel}>
                Forecast horizon: {forecastDays} days

                <input
                  type="range"
                  min="3"
                  max="30"
                  value={forecastDays}
                  onChange={(e) => {
                    setForecastDays(Number(e.target.value));
                    setForecastResults(null);
                  }}
                />
              </label>

              <button
                className={styles.primaryButton}
                onClick={generateForecast}
              >
                Generate forecasts →
              </button>

              {forecastResults === null ? (
                <div className={styles.emptyForecast}>
                  <div className={styles.emptyIcon}>⌁</div>

                  <h3>Your forecast will appear here.</h3>

                  <p>
                    Add daily hotel records or import a CSV file.
                    Then generate your revenue and occupancy forecast.
                  </p>

                  <small>
                    {records.length} historical records available
                  </small>
                </div>
              ) : (
                <>
                  <div className={styles.tabs}>
                    {["Revenue", "Occupancy"].map((tab) => (
                      <button
                        key={tab}
                        className={
                          forecastTab === tab
                            ? styles.tabActive
                            : ""
                        }
                        onClick={() => setForecastTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className={styles.forecastMetrics}>
                    {[
                      [
                        "Average forecast",
                        forecastTab === "Revenue"
                          ? money(
                              forecastResults.reduce(
                                (s, x) => s + x.revenue,
                                0
                              ) / forecastResults.length
                            )
                          : `${
                              (
                                forecastResults.reduce(
                                  (s, x) => s + x.occupancy,
                                  0
                                ) / forecastResults.length
                              ).toFixed(1)
                            }%`,
                      ],
                      [
                        "Highest forecast",
                        forecastTab === "Revenue"
                          ? money(
                              Math.max(
                                ...forecastResults.map((x) => x.revenue)
                              )
                            )
                          : `${Math.max(
                              ...forecastResults.map((x) => x.occupancy)
                            ).toFixed(1)}%`,
                      ],
                      [
                        "Lowest forecast",
                        forecastTab === "Revenue"
                          ? money(
                              Math.min(
                                ...forecastResults.map((x) => x.revenue)
                              )
                            )
                          : `${Math.min(
                              ...forecastResults.map((x) => x.occupancy)
                            ).toFixed(1)}%`,
                      ],
                    ].map(([label, value]) => (
                      <div className={styles.kpi} key={label}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>

{forecastResults && (
  <div className={styles.forecastChart}>
    <div className={styles.chartHeader}>
      <div>
        <h3>{forecastTab} forecast trend</h3>
        <p>Next {forecastDays} days · Demo projection</p>
      </div>
      <span>{forecastTab === "Revenue" ? "₹ INR" : "Occupancy %"}</span>
    </div>

    <div className={styles.chartCanvas}>
      <svg
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${forecastTab} forecast line chart`}
      >
        {[50, 100, 150, 200, 250].map((y) => (
          <line
            key={y}
            x1="50"
            y1={y}
            x2="950"
            y2={y}
            className={styles.chartGrid}
          />
        ))}

        <polyline
          points={chartLine}
          className={styles.forecastLine}
        />

        
{chartPoints.map((point, index) => (
  <circle
    key={index}
    cx={point.x}
    cy={point.y}
    r="6"
    className={styles.forecastPoint}
    onMouseEnter={() => setHoveredPoint(index)}
    onMouseLeave={() => setHoveredPoint(null)}
    onTouchStart={() => setHoveredPoint(index)}
  >
    <title>
      {forecastResults[index].date} —{" "}
      {forecastTab === "Revenue"
        ? money(point.value)
        : `${point.value}%`}
    </title>
  </circle>
))}

      </svg>

{hoveredPoint !== null && (
  <div
    className={styles.chartTooltip}
    style={{
      left: `${(chartPoints[hoveredPoint].x / 1000) * 100}%`,
      top: `${(chartPoints[hoveredPoint].y / 300) * 100}%`,
    }}
  >
    <strong>{forecastResults[hoveredPoint].date}</strong>
    <span>
      {forecastTab === "Revenue"
        ? money(chartPoints[hoveredPoint].value)
        : `${chartPoints[hoveredPoint].value}%`}
    </span>
  </div>
)}

    </div>

    <div className={styles.chartDates}>
      <span>{forecastResults[0]?.date}</span>
      <span>{forecastResults[forecastResults.length - 1]?.date}</span>
    </div>
  </div>
)}


                  <div className={styles.forecastList}>
                    {forecastResults.map((item) => (
                      <div key={item.date}>
                        <span>{item.date}</span>
                        <strong>
                          {forecastTab === "Revenue"
                            ? money(item.revenue)
                            : `${item.occupancy}%`}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <p className={styles.warning}>
                    DEMO SIMULATION — These are illustrative calculations
                    based on entered records, not actual ML predictions.
                  </p>
                </>
              )}
            </div>
          )}

          {/* MLOPS STATUS */}
          {activePage === "MLOps status" && (
            <>
              <div className={styles.section}>
                <h2>Model lifecycle</h2>

                <p>
                  Simulate a Hotelix model training workflow.
                </p>

                <button
                  className={styles.primaryButton}
                  onClick={trainModel}
                  disabled={training}
                >
                  {training
                    ? "Training simulation..."
                    : "Train / evaluate models now"}
                </button>

                {training && (
                  <div className={styles.trainingBox}>
                    <div className={styles.progressHeading}>
                      <span>Model training simulation</span>
                      <strong>{trainingProgress}%</strong>
                    </div>

                    <div className={styles.progressTrack}>
                      <div
                        style={{ width: `${trainingProgress}%` }}
                      />
                    </div>

                    <p>
                      Preparing data · Fitting model · Evaluating
                      holdout performance
                    </p>
                  </div>
                )}

                {trainingProgress === 100 && !training && (
                  <p className={styles.success}>
                    ✓ Demo training completed. No actual ML model was trained.
                  </p>
                )}

                <p className={styles.muted}>
                  Real Hotelix training requires at least 30 daily records.
                  This public demo only simulates the process.
                </p>
              </div>

              <div className={styles.section}>
                <h2>Model history</h2>

                <div className={styles.tableWrap}>
                  <table>
                    <thead>
                      <tr>
                        <th>Target</th>
                        <th>Algorithm</th>
                        <th>MAE</th>
                        <th>Rows used</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Occupancy</td>
                        <td>RandomForestRegressor</td>
                        <td>Simulation</td>
                        <td>{records.length}</td>
                        <td>Demo</td>
                      </tr>

                      <tr>
                        <td>Revenue</td>
                        <td>RandomForestRegressor</td>
                        <td>Simulation</td>
                        <td>{records.length}</td>
                        <td>Demo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className={styles.warning}>
                  Illustrative model metadata only. No trained model or
                  real evaluation is present.
                </p>
              </div>
            </>
          )}

          {/* FOOTER */}
          <footer className={styles.pageFooter}>
            <span>HOTELIX V1.2.0 · HAFSAAMU</span>
            <span>
              INTERACTIVE SIMULATION · NOT PRODUCTION SOFTWARE
            </span>
          </footer>
        </div>
      </section>
    </main>
  );
}
