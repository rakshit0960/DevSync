import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Supabase credentials are missing! Ensure SUPABASE_URL and SUPABASE_KEY are set.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
