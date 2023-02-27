import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://zxoccpdgzsgqeoumujzg.supabase.co';
const supabaseAnonKey =
  // eslint-disable-next-line max-len
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4b2NjcGRnenNncWVvdW11anpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4NzMxNDQsImV4cCI6MTk5MjQ0OTE0NH0.wNq5hioLesZ9LoLVioNGozNtnjH5GJSmBhPZHbbplEQ';

export interface Database {
  public: {
    Tables: {
      review: {
        Row: {
          id: number;
          created_at: string;
          content: string;
          title: string;
          image?: {
            url: string;
            path: string;
          };
        }; // The data expected to be returned from a "select" statement.
        Insert: {
          content: string;
          title: string;
          image?: {
            url: string;
            path: string;
          };
        }; // The data expected passed to an "insert" statement.
        Update: {
          content: string;
          title: string;
          image?: {
            url: string;
            path: string;
          };
        }; // The data expected passed to an "update" statement.
      };
      countries: {};
    };
  };
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
