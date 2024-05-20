import { Tables } from "@/types/supabase";
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from "@/utils/supabase/client"
import Table from "./table";


async function getData(): Promise<Tables<'school'>[]> {
  const supabase = createClient();
  let { data: school, error } = await supabase
    .from('school')
    .select('*')

    return school as Tables<'school'>[];
  }
  
  export default async function TaskPage() {
    const data = await getData()
  return (
    <>
      <div className="h-screen flex-1 flex-col space-y-8  p-8 md:flex ">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Schools!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all the schools
            </p>
          </div>
          <div className="flex items-center space-x-2">
          </div>
        </div>
        {/* <DataTable data={data} columns={columns} /> */}
        <Table schools={data} />
      </div>
    </>
  )
}
