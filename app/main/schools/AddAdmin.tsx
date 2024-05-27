import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { generateRandomCode } from "@/lib/utils"
import { SchoolDataState } from "@/store/main/SchoolData"
import { createClient } from "@/utils/supabase/client"
import { PlusCircle } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card" 
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Tables } from "@/types/supabase"

export default function AddAdmin({ id,code }: { id: number,code:string }) {

  const [open, setOpen] = useState(false)
  const [data, setData] = useState({ email: "" })
  const [admin, setAdmin] = useState<Tables<'admin'>[]>([]);


  const { toast } = useToast()
  const supabase = createClient()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({ ...data, [e.target.id]: e.target.value })
    console.log(data)
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { data: admin, error } = await supabase
      .from('admin')
      .insert(
        { email: data.email, school_id: id, role: "admin" },
      )
      .select()
    if (error) {
      console.log(error)
      toast({
        title: "error",
        description: error.message,
        variant: "destructive"
      })
    } else {
      console.log(admin)
      getadmins();

      toast({
        title: "now sign up using this data",
        description: `email: ${data.email}, school code: ${code}`,
      })
      setData({ email: "" })
    }
  }

  async function getadmins() {
    let { data: admins, error } = await supabase
      .from('school')
      .select('admin(*)')
      .eq('id', id)
    if (error) {
      console.log(error);
    } else {
      setAdmin(admins?.[0]?.admin || []);
    }
  }

  async function deleteAdmin(id: number) {
    let { error } = await supabase
      .from('admin')
      .delete()
      .eq('id', id)
    if (error) {
      console.log(error);
    } else {
      getadmins();
    }
  }

  useEffect(() => {
    getadmins();
  }, [])
 

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger asChild>
          <Button size="sm" className="h-8 gap-1 ml-auto">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add admin
            </span>
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[400px] sm:w-[640px] sm:max-w-[540px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle>Add New admin</SheetTitle>
            <SheetDescription>
              Enter School Details to register the school
            </SheetDescription>
          </SheetHeader>

          <div className="grid  gap-6">
            <form onSubmit={submit}>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" onChange={handleChange} value={data.email} placeholder="m@example.com" />
                <Button className="w-full" >Create account</Button>

              </div>
            </form>
          </div>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>email</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">roles</TableHead>
              <TableHead className="hidden md:table-cell"></TableHead>
              <TableHead className="text-right">delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
        {admin.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell>
                <div className="font-medium">{admin.email}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{new Date(admin.created_at).toLocaleDateString().toString()}</TableCell>
              <TableCell className="hidden md:table-cell">{admin.role}</TableCell>
              <TableCell className="hidden md:table-cell">{admin.role}</TableCell>
              <TableCell className="text-right">
              <Button onClick={() => { deleteAdmin(admin.id) }} variant="link" >Delete</Button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
        </Table>
        </SheetContent>
      </Sheet>
    </>
  )
}
