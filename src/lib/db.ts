import { createClient, Client } from '@libsql/client';

let db: Client | null = null;
let dbInitialized = false;

function getDb(): Client {
  if (!db) {
    db = createClient({
      url: process.env.TURSO_DATABASE_URL || 'file:./emama.db',
      authToken: process.env.TURSO_AUTH_TOKEN || undefined,
    });
  }
  return db;
}

export async function initDb() {
  if (dbInitialized) return;
  const database = getDb();
  await database.batch([
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clerk_id TEXT UNIQUE NOT NULL,
      username TEXT,
      email TEXT,
      first_name TEXT,
      last_name TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS user_preferences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clerk_id TEXT UNIQUE NOT NULL,
      favorite_foods TEXT DEFAULT '[]',
      activities TEXT DEFAULT '[]',
      hobbies TEXT DEFAULT '[]',
      personality_type TEXT,
      travel_context TEXT,
      time_preferences TEXT DEFAULT '[]',
      dietary_notes TEXT,
      favorite_seating TEXT,
      coffee_preference TEXT,
      special_moments TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS booked_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clerk_id TEXT NOT NULL,
      event_id TEXT NOT NULL,
      event_title TEXT,
      event_time TEXT,
      event_type TEXT,
      event_image TEXT,
      booked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(clerk_id, event_id)
    )`,
    `CREATE TABLE IF NOT EXISTS schedule_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clerk_id TEXT NOT NULL,
      activity_id TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(clerk_id, activity_id)
    )`,
    `CREATE TABLE IF NOT EXISTS service_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clerk_id TEXT NOT NULL,
      request_type TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      fulfilled_at DATETIME
    )`,
    `CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id)`,
    `CREATE INDEX IF NOT EXISTS idx_prefs_clerk_id ON user_preferences(clerk_id)`,
    `CREATE INDEX IF NOT EXISTS idx_bookings_clerk ON booked_events(clerk_id)`,
    `CREATE INDEX IF NOT EXISTS idx_schedule_clerk ON schedule_progress(clerk_id)`,
  ]);
  dbInitialized = true;
}

export async function upsertUser(data: {
  clerk_id: string;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
}) {
  const database = getDb();
  await database.execute({
    sql: `INSERT INTO users (clerk_id, username, email, first_name, last_name, image_url)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(clerk_id) DO UPDATE SET
            username = excluded.username,
            email = excluded.email,
            first_name = excluded.first_name,
            last_name = excluded.last_name,
            image_url = excluded.image_url,
            updated_at = CURRENT_TIMESTAMP`,
    args: [data.clerk_id, data.username || null, data.email || null, data.first_name || null, data.last_name || null, data.image_url || null],
  });
}

export async function getUserByClerkId(clerk_id: string) {
  const database = getDb();
  const result = await database.execute({
    sql: 'SELECT * FROM users WHERE clerk_id = ?',
    args: [clerk_id],
  });
  const row = result.rows[0];
  if (!row) return undefined;
  return {
    id: row.id as number,
    clerk_id: row.clerk_id as string,
    username: row.username as string | null,
    email: row.email as string | null,
    first_name: row.first_name as string | null,
    last_name: row.last_name as string | null,
    image_url: row.image_url as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

export async function savePreferences(clerk_id: string, prefs: {
  favorite_foods: string[];
  activities: string[];
  hobbies: string[];
  personality_type: string;
  travel_context: string;
  time_preferences: string[];
  dietary_notes?: string;
  favorite_seating?: string;
  coffee_preference?: string;
  special_moments?: string[];
}) {
  const database = getDb();
  await database.execute({
    sql: `INSERT INTO user_preferences (
            clerk_id, favorite_foods, activities, hobbies, personality_type,
            travel_context, time_preferences, dietary_notes, favorite_seating,
            coffee_preference, special_moments
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(clerk_id) DO UPDATE SET
            favorite_foods = excluded.favorite_foods,
            activities = excluded.activities,
            hobbies = excluded.hobbies,
            personality_type = excluded.personality_type,
            travel_context = excluded.travel_context,
            time_preferences = excluded.time_preferences,
            dietary_notes = excluded.dietary_notes,
            favorite_seating = excluded.favorite_seating,
            coffee_preference = excluded.coffee_preference,
            special_moments = excluded.special_moments,
            updated_at = CURRENT_TIMESTAMP`,
    args: [
      clerk_id,
      JSON.stringify(prefs.favorite_foods),
      JSON.stringify(prefs.activities),
      JSON.stringify(prefs.hobbies),
      prefs.personality_type || null,
      prefs.travel_context || null,
      JSON.stringify(prefs.time_preferences),
      prefs.dietary_notes || null,
      prefs.favorite_seating || null,
      prefs.coffee_preference || null,
      JSON.stringify(prefs.special_moments || []),
    ],
  });
}

export async function getPreferences(clerk_id: string) {
  const database = getDb();
  const result = await database.execute({
    sql: 'SELECT * FROM user_preferences WHERE clerk_id = ?',
    args: [clerk_id],
  });
  const row = result.rows[0];
  if (!row) return null;

  return {
    favorite_foods: JSON.parse((row.favorite_foods as string) || '[]') as string[],
    activities: JSON.parse((row.activities as string) || '[]') as string[],
    hobbies: JSON.parse((row.hobbies as string) || '[]') as string[],
    personality_type: row.personality_type as string | null,
    travel_context: row.travel_context as string | null,
    time_preferences: JSON.parse((row.time_preferences as string) || '[]') as string[],
    dietary_notes: row.dietary_notes as string | null,
    favorite_seating: row.favorite_seating as string | null,
    coffee_preference: row.coffee_preference as string | null,
    special_moments: JSON.parse((row.special_moments as string) || '[]') as string[],
  };
}

// === Schedule & Bookings ===

export async function bookEvent(clerk_id: string, event: {
  event_id: string;
  event_title: string;
  event_time: string;
  event_type: string;
  event_image: string;
}) {
  const database = getDb();
  await database.execute({
    sql: `INSERT OR IGNORE INTO booked_events (clerk_id, event_id, event_title, event_time, event_type, event_image)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [clerk_id, event.event_id, event.event_title, event.event_time, event.event_type, event.event_image],
  });
}

export async function getBookedEvents(clerk_id: string) {
  const database = getDb();
  const result = await database.execute({
    sql: 'SELECT * FROM booked_events WHERE clerk_id = ? ORDER BY booked_at DESC',
    args: [clerk_id],
  });
  return result.rows.map(row => ({
    id: row.event_id as string,
    title: row.event_title as string,
    time: row.event_time as string,
    type: row.event_type as string,
    image: row.event_image as string,
  }));
}

export async function toggleScheduleProgress(clerk_id: string, activity_id: string, completed: boolean) {
  const database = getDb();
  await database.execute({
    sql: `INSERT INTO schedule_progress (clerk_id, activity_id, completed)
          VALUES (?, ?, ?)
          ON CONFLICT(clerk_id, activity_id) DO UPDATE SET
            completed = ?, updated_at = CURRENT_TIMESTAMP`,
    args: [clerk_id, activity_id, completed ? 1 : 0, completed ? 1 : 0],
  });
}

export async function getScheduleProgress(clerk_id: string) {
  const database = getDb();
  const result = await database.execute({
    sql: 'SELECT activity_id, completed FROM schedule_progress WHERE clerk_id = ?',
    args: [clerk_id],
  });
  const completed = new Set<string>();
  result.rows.forEach(row => {
    if ((row.completed as number) === 1) completed.add(row.activity_id as string);
  });
  return completed;
}

// === Service Requests ===

export async function createServiceRequest(clerk_id: string, request_type: string) {
  const database = getDb();
  // Ensure table exists (in case initDb ran before table was added)
  try {
    await database.execute(`INSERT INTO service_requests (clerk_id, request_type) VALUES (?, ?)`, [clerk_id, request_type]);
  } catch {
    // Table might not exist, create it and retry
    await database.execute(`CREATE TABLE IF NOT EXISTS service_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clerk_id TEXT NOT NULL,
      request_type TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      fulfilled_at DATETIME
    )`);
    await database.execute(`INSERT INTO service_requests (clerk_id, request_type) VALUES (?, ?)`, [clerk_id, request_type]);
  }
}

export async function getServiceRequests() {
  const database = getDb();
  const result = await database.execute({
    sql: `SELECT sr.id, sr.clerk_id, sr.request_type, sr.status, sr.created_at, sr.fulfilled_at,
          COALESCE(u.first_name, 'Guest') as first_name, u.email
          FROM service_requests sr
          LEFT JOIN users u ON sr.clerk_id = u.clerk_id
          ORDER BY sr.created_at DESC`,
    args: [],
  });
  return result.rows.map(row => ({
    id: row.id as number,
    clerk_id: row.clerk_id as string,
    request_type: row.request_type as string,
    status: row.status as string,
    created_at: row.created_at as string,
    fulfilled_at: row.fulfilled_at as string | null,
    first_name: row.first_name as string,
    email: row.email as string | null,
  }));
}

export async function fulfillServiceRequest(id: number) {
  const database = getDb();
  await database.execute({
    sql: 'UPDATE service_requests SET status = ?, fulfilled_at = CURRENT_TIMESTAMP WHERE id = ?',
    args: ['fulfilled', id],
  });
}

export default getDb;
