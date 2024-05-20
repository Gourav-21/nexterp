import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { generateRandomCode } from "@/lib/utils"
import { SchoolDataState } from "@/store/main/SchoolData"
import { createClient } from "@/utils/supabase/client"
import { Table } from "@tanstack/react-table"
import { PlusCircle } from "lucide-react"
import { FormEvent, useState } from "react"
import { useSetRecoilState } from "recoil"

export default function AddSchool() {
  const setSchoolData = useSetRecoilState(SchoolDataState)

  const [open, setOpen] = useState(false)
  const [data, setData] = useState({ name: "" })

  const { toast } = useToast()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({ ...data, [e.target.id]: e.target.value })
    console.log(data)
  }

  async function Addschool(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const supabase = createClient()
    const { data: school, error } = await supabase
      .from('school')
      .insert({ name: data.name, school_code: generateRandomCode() })
      .select()
    if (error) {
      console.log(error)
    } else {
      console.log(school)
      setSchoolData((value) => [...value, school[0]])
      setOpen(false)
      setData({ name: "" })
      toast({
        title: "school added",
        description: `refresh the school list`,
      })
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen} >

        <SheetTrigger asChild>
          <Button size="sm" className="h-8 gap-1 ml-auto">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add school
            </span>
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[400px] sm:w-[540px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle>Add New School</SheetTitle>
            <SheetDescription>
              Enter School Details to register the school
            </SheetDescription>
          </SheetHeader>

          <div className="grid  gap-6">
            <form onSubmit={Addschool}>

              <div className="grid gap-2">
                <Label htmlFor="email" className="">School Name</Label>
                <Input id="name" type="text" required onChange={handleChange} value={data.name} />
                <Button className="w-full" >Add school</Button>

              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
