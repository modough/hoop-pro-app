import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";

const DB_NAME = "hoopspro";
const DB_VERSION = 1;

let db: SQLiteDBConnection | null = null;
let sqlite: SQLiteConnection | null = null;

/* =========================
   TABLES
========================= */

const CREATE_DRILL_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS completed_drills (
  id TEXT PRIMARY KEY NOT NULL,
  timestamp INTEGER NOT NULL
);
`;

const CREATE_TRAINING_LOG_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS training_log (
  date TEXT PRIMARY KEY NOT NULL,
  minutes INTEGER NOT NULL
);
`;

/* =========================
   INIT DB
========================= */

export async function initDB(): Promise<SQLiteDBConnection> {
  if (db) return db;

  // 🌐 Web fallback
  if (!Capacitor.isNativePlatform()) {
    return createWebFallback();
  }

  sqlite = new SQLiteConnection(CapacitorSQLite);

  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection(DB_NAME, false)).result;

  if (ret.result && isConn) {
    db = await sqlite.retrieveConnection(DB_NAME, false);
  } else {
    db = await sqlite.createConnection(
      DB_NAME,
      false,
      "no-encryption",
      DB_VERSION,
      false
    );
  }

  await db.open();

  await db.execute(CREATE_DRILL_TABLE_SQL);
  await db.execute(CREATE_TRAINING_LOG_TABLE_SQL);

  return db;
}

export async function closeDB(): Promise<void> {
  if (db && sqlite) {
    await sqlite.closeConnection(DB_NAME, false);
    db = null;
  }
}

/* =========================
   HELPERS
========================= */

function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/* =========================
   DRILLS
========================= */

export async function getCompletedDrills(): Promise<string[]> {
  const database = await initDB();

  const res = await database.query("SELECT id FROM completed_drills");

  return res.values?.map((d: any) => d.id) || [];
}

export async function addDrill(id: string) {
  const database = await initDB();

  await database.run(
    `INSERT OR REPLACE INTO completed_drills (id, timestamp)
     VALUES (?, ?)`,
    [id, Date.now()]
  );
}

export async function removeDrill(id: string) {
  const database = await initDB();

  await database.run(
    `DELETE FROM completed_drills WHERE id = ?`,
    [id]
  );
}
export async function removeMinutes(date: string) {
  const database = await initDB();

  await database.run(
    `DELETE FROM training_log WHERE date = ?`,
    [date]
  );
}

/* =========================
   TRAINING LOG
========================= */

export async function addTrainingMinutes(minutes: number) {
  if (!minutes || minutes <= 0) return; 

  const database = await initDB();
  const today = getToday();

  const safeMinutes = Math.floor(minutes); 

  if (safeMinutes === 0) return; // avoid useless writes

  await database.run(
    `
    INSERT INTO training_log (date, minutes)
    VALUES (?, ?)
    ON CONFLICT(date)
    DO UPDATE SET minutes = minutes + excluded.minutes
    `,
    [today, safeMinutes]
  );
}

export async function getTrainingLog(): Promise<Record<string, number>> {
  const database = await initDB();

  const res = await database.query(
    "SELECT date, minutes FROM training_log"
  );

  const log: Record<string, number> = {};

  res.values?.forEach((row: any) => {
    log[row.date] = row.minutes;
  });

  return log;
}

export async function getDailyLogs(year: number, month: number) {
  const database = await initDB();

  const monthStr = String(month + 1).padStart(2, "0");
  const prefix = `${year}-${monthStr}`;

  const res = await database.query(
    `
    SELECT date, minutes
    FROM training_log
    WHERE date LIKE ?
    `,
    [`${prefix}%`]
  );

  return res.values || [];
}

/* =========================
   WEB FALLBACK (LOCALSTORAGE)
========================= */

function createWebFallback(): SQLiteDBConnection {
  const DRILLS_STORAGE = "hoopspro-drills-fallback";
  const TRAINING_LOG_STORAGE = "hoopspro-training-log-fallback";

  /* ---------- DRILLS ---------- */

  const getDrills = () => {
    try {
      return JSON.parse(localStorage.getItem(DRILLS_STORAGE) || "[]");
    } catch {
      return [];
    }
  };

  const saveDrills = (items: any[]) =>
    localStorage.setItem(DRILLS_STORAGE, JSON.stringify(items));

  /* ---------- TRAINING LOG ---------- */

  const getTrainingLog = (): Record<string, number> => {
    try {
      return JSON.parse(localStorage.getItem(TRAINING_LOG_STORAGE) || "{}");
    } catch {
      return {};
    }
  };

  const saveTrainingLog = (log: Record<string, number>) =>
    localStorage.setItem(TRAINING_LOG_STORAGE, JSON.stringify(log));

  return {
    /* ---------- QUERY ---------- */
    query: async (sql: string, values?: any[]) => {
      // ✅ COMPLETED DRILLS
      if (sql.includes("completed_drills")) {
        const drills = getDrills();

        return {
          values: drills.map((d: any) => ({ id: d.id })),
        };
      }

      // ✅ TRAINING LOG
      if (sql.includes("training_log")) {
        const log = getTrainingLog();

        let entries = Object.keys(log).map((date) => ({
          date,
          minutes: log[date],
        }));

        // ✅ support WHERE date LIKE 'YYYY-MM%'
        if (sql.includes("LIKE") && values?.[0]) {
          const prefix = values[0].replace("%", "");
          entries = entries.filter((e) => e.date.startsWith(prefix));
        }

        return { values: entries };
      }

      return { values: [] };
    },

    /* ---------- RUN ---------- */
    run: async (sql: string, values?: any[]) => {
      // ✅ DRILLS
      if (sql.includes("completed_drills")) {
        let items = getDrills();

        if (sql.includes("INSERT")) {
          const [id, timestamp] = values || [];

          const index = items.findIndex((d: any) => d.id === id);

          if (index >= 0) {
            items[index] = { id, timestamp };
          } else {
            items.push({ id, timestamp });
          }

          saveDrills(items);
        }

        if (sql.includes("DELETE")) {
          const id = values?.[0];
          items = items.filter((d: any) => d.id !== id);
          saveDrills(items);
        }
      }

      // ✅ TRAINING LOG (matches SQLite behavior)
      if (sql.includes("training_log")) {
        const log = getTrainingLog();

        const date = values?.[0];
        const minutes = Math.floor(values?.[1] || 0); // ✅ force integer

        if (!date || minutes <= 0) {
          return { changes: { changes: 0 } };
        }

        // ✅ mimic: ON CONFLICT(date) DO UPDATE SET minutes += value
        log[date] = (log[date] || 0) + minutes;

        saveTrainingLog(log);
      }

      return { changes: { changes: 1 } };
    },

    execute: async () => ({
      changes: { changes: 0 },
    }),

    open: async () => {},
    close: async () => {},
  } as unknown as SQLiteDBConnection;
}