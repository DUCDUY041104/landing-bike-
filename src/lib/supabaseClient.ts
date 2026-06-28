import { createClient } from "@supabase/supabase-js";

// Lấy các thông số cấu hình từ biến môi trường (.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials are missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
  );
}

// Khởi tạo Supabase client dùng chung cho toàn bộ dự án
export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);
