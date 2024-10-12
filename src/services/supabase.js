import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vrrdzrqlllfdyghseksp.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZycmR6cnFsbGxmZHlnaHNla3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxMDcxMjUsImV4cCI6MjA0MzY4MzEyNX0.hSj0ck0asz-DW2HTRURHdJsPw3CszcprZXm2QkqIJTw`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
