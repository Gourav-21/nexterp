"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormEvent, useState } from "react"
import { createClient } from "@/utils/supabase/client"

export default function Index() {
  const [login, setLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("student");

  async function signIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          data: {
            role: role
          }
        }
      }
    )
    if (error) {
      alert(error)
      setIsLoading(false);
    } else {
      console.log(data)
      setIsLoading(false);
    }
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
      setIsLoading(false);
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
                <Button variant="outline" className="w-full">
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
            <form onSubmit={signIn}>
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
                  <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Sign up"}
                </Button>
                <Button variant="outline" className="w-full">
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
