"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"
import { redirect, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import SignupButton from "@/components/SignupButton"

export default function Index() {

  const router = useRouter()
  const { toast } = useToast()

  async function SignUp(formData: FormData) {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();

    const { data , error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            role: "main"
          }
        }
      })
      if (error) {
        alert(error)
      } else {
        console.log(data)
        router.push(`/${data.user?.user_metadata.role}`)
      }
  }

  return (
    <div className="w-full lg:grid  h-screen">
      <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Create an account</h1>
              <p className="text-balance text-muted-foreground">
                Enter your information to create an account
              </p>
            </div>
            <form action={SignUp}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input name="password" type="password" required minLength={6} />
                </div>
                <SignupButton />
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Button variant="link" className="underline p-1" onClick={() => router.push("/")}>
                Login
              </Button>
            </div>
          </div>
      </div>
    </div>
  )
}