import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { generateRandomData } from "./fun"
import Link from "next/link"
import { CircleUser, Package2, Search } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"            
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Header2 from "@/components/Header2"


async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const randomDataArray = generateRandomData()
  return randomDataArray
}

export  async function DemoPage() {
  const data = await getData()

  return (
    <div className="">
      <div className="mt-4 container">

        <Card >
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default async function TaskPage() {
  const tasks = generateRandomData()

  return (
    <>

      <Header />
    {/* <div className="bg-muted/40 pt-4">
      <Header2 />
    </div> */}
      <div className="hidden h-full flex-1 flex-col space-y-8  p-8 md:flex ">
  
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Students!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
          <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback> <CircleUser className="h-5 w-5" /></AvatarFallback>
                </Avatar>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
