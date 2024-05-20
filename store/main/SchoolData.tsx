import { atom } from "recoil";
import { Tables } from '@/types/supabase'

export const SchoolDataState = atom<Tables<'school'>[]>({
    key: 'MainSchoolDataState', 
    default: [], 
  });