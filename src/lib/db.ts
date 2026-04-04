import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), process.env.DATABASE_PATH || 'emama.db');

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    try {
      db = new Database(DB_PATH);
      db.pragma('journal_mode = WAL');
      db.pragma('foreign_keys = ON');
      initializeTables();
      console.log('[db] Initialized at:', DB_PATH);
    } catch (err) {
      console.error('[db] Failed to initialize:', err);
      throw err;
    }
  }
  return db;
}

function initializeTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clerk_id TEXT UNIQUE NOT NULL,
      username TEXT,
      email TEXT,
      first_name TEXT,
      last_name TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
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
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (clerk_id) REFERENCES users(clerk_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
    CREATE INDEX IF NOT EXISTS idx_prefs_clerk_id ON user_preferences(clerk_id);
  `);
}

export function upsertUser(data: {
  clerk_id: string;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
}) {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO users (clerk_id, username, email, first_name, last_name, image_url)
    VALUES (@clerk_id, @username, @email, @first_name, @last_name, @image_url)
    ON CONFLICT(clerk_id) DO UPDATE SET
      username = @username,
      email = @email,
      first_name = @first_name,
      last_name = @last_name,
      image_url = @image_url,
      updated_at = CURRENT_TIMESTAMP
  `);

  stmt.run({
    clerk_id: data.clerk_id,
    username: data.username || null,
    email: data.email || null,
    first_name: data.first_name || null,
    last_name: data.last_name || null,
    image_url: data.image_url || null,
  });
}

export function getUserByClerkId(clerk_id: string) {
  const database = getDb();
  const stmt = database.prepare('SELECT * FROM users WHERE clerk_id = ?');
  return stmt.get(clerk_id) as {
    id: number;
    clerk_id: string;
    username: string | null;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
    created_at: string;
    updated_at: string;
  } | undefined;
}

export function savePreferences(clerk_id: string, prefs: {
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
  const stmt = database.prepare(`
    INSERT INTO user_preferences (
      clerk_id, favorite_foods, activities, hobbies, personality_type,
      travel_context, time_preferences, dietary_notes, favorite_seating,
      coffee_preference, special_moments
    )
    VALUES (@clerk_id, @foods, @activities, @hobbies, @personality,
            @travel, @times, @dietary, @seating, @coffee, @moments)
    ON CONFLICT(clerk_id) DO UPDATE SET
      favorite_foods = @foods,
      activities = @activities,
      hobbies = @hobbies,
      personality_type = @personality,
      travel_context = @travel,
      time_preferences = @times,
      dietary_notes = @dietary,
      favorite_seating = @seating,
      coffee_preference = @coffee,
      special_moments = @moments,
      updated_at = CURRENT_TIMESTAMP
  `);

  stmt.run({
    clerk_id,
    foods: JSON.stringify(prefs.favorite_foods),
    activities: JSON.stringify(prefs.activities),
    hobbies: JSON.stringify(prefs.hobbies),
    personality: prefs.personality_type || null,
    travel: prefs.travel_context || null,
    times: JSON.stringify(prefs.time_preferences),
    dietary: prefs.dietary_notes || null,
    seating: prefs.favorite_seating || null,
    coffee: prefs.coffee_preference || null,
    moments: JSON.stringify(prefs.special_moments || []),
  });
}

export function getPreferences(clerk_id: string) {
  const database = getDb();
  const stmt = database.prepare('SELECT * FROM user_preferences WHERE clerk_id = ?');
  const row = stmt.get(clerk_id) as {
    clerk_id: string;
    favorite_foods: string;
    activities: string;
    hobbies: string;
    personality_type: string | null;
    travel_context: string | null;
    time_preferences: string;
    dietary_notes: string | null;
    favorite_seating: string | null;
    coffee_preference: string | null;
    special_moments: string;
  } | undefined;

  if (!row) return null;

  return {
    favorite_foods: JSON.parse(row.favorite_foods) as string[],
    activities: JSON.parse(row.activities) as string[],
    hobbies: JSON.parse(row.hobbies) as string[],
    personality_type: row.personality_type,
    travel_context: row.travel_context,
    time_preferences: JSON.parse(row.time_preferences) as string[],
    dietary_notes: row.dietary_notes,
    favorite_seating: row.favorite_seating,
    coffee_preference: row.coffee_preference,
    special_moments: JSON.parse(row.special_moments) as string[],
  };
}

export default getDb;
