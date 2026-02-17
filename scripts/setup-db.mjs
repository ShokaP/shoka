import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setup() {
  console.log("Creating tables...");

  // Create hidden_projects table
  const { error: err1 } = await supabase.rpc("exec_sql", {
    sql: `CREATE TABLE IF NOT EXISTS hidden_projects (
      id SERIAL PRIMARY KEY,
      uuid TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );`,
  });

  if (err1) {
    console.log("Trying direct approach for hidden_projects...");
    // Try inserting to see if table exists
    const { error: checkErr } = await supabase
      .from("hidden_projects")
      .select("id")
      .limit(1);
    
    if (checkErr) {
      console.error("Table hidden_projects does not exist. Please create it manually in Supabase SQL Editor:");
      console.log(`
CREATE TABLE hidden_projects (
  id SERIAL PRIMARY KEY,
  uuid TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE custom_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  url TEXT NOT NULL,
  status TEXT DEFAULT 'running',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
      `);
      process.exit(1);
    } else {
      console.log("hidden_projects table already exists");
    }
  } else {
    console.log("hidden_projects table created");
  }

  // Check custom_projects
  const { error: checkErr2 } = await supabase
    .from("custom_projects")
    .select("id")
    .limit(1);

  if (checkErr2) {
    console.error("Table custom_projects does not exist. See SQL above.");
    process.exit(1);
  } else {
    console.log("custom_projects table exists");
  }

  console.log("Setup complete!");
}

setup();
