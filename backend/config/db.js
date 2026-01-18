import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

export const database = createClient(process.env.DATABASE_URL, process.env.DATABASE_KEY);