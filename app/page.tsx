"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormEvent, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { useRouter } from "next/navigation"
import { createUser } from "@/app/actions/signup"
import { useToast } from "@/components/ui/use-toast"
import SignupButton from "../components/SignupButton"
import { ToastProps } from "@/components/ui/toast"

export default function Index() {
  const [login, setLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [role, setRole] = useState("student");

  const router = useRouter()
  const { toast } = useToast()

  const signup = createUser.bind(null, {
    email,
    password,
    role,
    code
  })

  async function signUp() {
    const res = await signup()
    toast(res as ToastProps);
  }


  async function Login(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault()
    const supabase = createClient();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if (error) {
      alert(error)
      setIsLoading(false);
    } else {
      console.log(data)
      router.push(`/${data.user?.user_metadata.role}`)
      // setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:grid  h-screen">
      <div className="flex items-center justify-center py-12">
        {login ? (
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <form onSubmit={Login}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required minLength={6} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Login"}
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Login with Google
                </Button>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{""}
              <Button variant="link" className="underline p-2" onClick={() => setLogin(false)}>
                Sign up
              </Button>
            </div>
          </div>
        ) : (
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Create an account</h1>
              <p className="text-balance text-muted-foreground">
                Enter your information to create an account
              </p>
            </div>
            <Tabs defaultValue={role} onValueChange={(e) => setRole(e)} className="grid">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
                <TabsTrigger value="student">Student</TabsTrigger>
              </TabsList>
            </Tabs>
            <form action={signUp}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="school code">School code</Label>
                  </div>
                  <div className="flex items-center ">
                    <OTP value={code} setValue={setCode} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required minLength={6} />
                </div>
                <SignupButton />
                <Button type="button" variant="outline" className="w-full">
                  Sign up with Google
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Button variant="link" className="underline p-1" onClick={() => setLogin(true)}>
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


function OTP({ value, setValue }: { value: string; setValue: (value: string) => void }) {

  return (
    <div className="space-y-1 flex items-center justify-center w-full">
      <InputOTP
        maxLength={8}
        value={value}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        onChange={(value) => setValue(value)}
        required
        minLength={8}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}