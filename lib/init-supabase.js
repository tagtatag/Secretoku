import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rmtrmpckdstsevtpadaf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtdHJtcGNrZHN0c2V2dHBhZGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY0MjM2NjUsImV4cCI6MTk3MTk5OTY2NX0.dwOEkKKfGY4K01soK6RTdOVKyFFk5e59tfO0X9nEwhQ"
);
