'use server'
 
import { cookies } from 'next/headers'
 
export async function setSidebar(data:boolean) {
  cookies().set('react-resizable-panels:collapsed', `${data}`)
}