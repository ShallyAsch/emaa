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
  // Recreate tables to remove FK constraint
  await database.batch([
    `DROP TABLE IF EXISTS user_preferences`,
    `DROP TABLE IF EXISTS users`,
    `CREATE TABLE users (
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
    `CREATE TABLE user_preferences (
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
    `CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id)`,
    `CREATE INDEX IF NOT EXISTS idx_prefs_clerk_id ON user_preferences(clerk_id)`,
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

export default getDb;
