'use server'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createUser({ email, password, role, code }: { email: string, password: string, role: string, code: string }) {
  const supabase = createClient();

  if (role == "admin") {
    let { data: unassigned_admins, error: search_error } = await supabase
      .from('unassigned_admins')
      .select('*')
      .match({ school_code: code, email: email, password: password })

    if (search_error) {
      console.log(search_error)
      return
    }

    console.log(unassigned_admins)

    if (unassigned_admins?.length == 0) {
      return {
        variant: "destructive",
        title: "Email or password is wrong",
        description: "contact admin",
      }
    }

    const { data: user, error: signupError } = await supabase.auth.signUp(
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

    if (signupError) {
      console.log(signupError)
      return {
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: signupError.message,
      }
    }

    const { data: admin, error } = await supabase
      .from('admin')
      .insert(
        { user_id: user.user?.id, email: email, school_code: code, role: unassigned_admins[0]?.role },
      )
      .select()

    if (error) {
      console.log(error)
      return {
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      }
    } else {
      console.log(admin)
    }

    const { error: delete_error } = await supabase
      .from('unassigned_admins')
      .delete()
      .eq("id", unassigned_admins[0]?.id)

    if (delete_error) {
      console.log(delete_error)
      return
    }

    redirect(`/admin`)
  }

  if (role == "teacher") {
    let { data: teacher, error: search_error } = await supabase
      .from('teacher')
      .select('*')
      .match({ school_code: code, email: email })

    if (search_error) {
      console.log(search_error)
      return
    }

    console.log(teacher)

    if (teacher?.length == 0) {
      return {
        variant: "destructive",
        title: "Uh oh! this email is not registered with this school.",
        description: "contact admin",
      }
    }
    if (teacher[0].user_id != null) {
      return {
        variant: "destructive",
        title: "Account already exists",
        description: "contact admin",
      }
    }


    const { data: user, error: signupError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          role: role
        }
      },
    })

    if (signupError) {
      console.log(signupError)
      return {
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: signupError.message,
      }
    }

    // const { data: updatedTeacher, error } = await supabase
    //   .from('teacher')
    //   .update({user_id: user.user?.id})
    //   .eq('id',teacher[0].id)
    //   .select()

    // if (error) {
    //   console.log(error)
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: error.message,
    //   })
    // } else {
    //   console.log(updatedTeacher)
    // }
    redirect(`/teacher`)


  }

  if (role == "student") {
    let { data: student, error: search_error } = await supabase
      .from('student')
      .select('*')
      .match({ school_code: code, email: email })

    if (search_error) {
      console.log(search_error)
      return
    }

    console.log(student)

    if (student?.length == 0) {
      return {
        variant: "destructive",
        title: "Uh oh! this email is not registered with this school.",
        description: "contact admin",
      }
    }
    if (student[0].user_id != null) {
      return {
        variant: "destructive",
        title: "Account already exists",
        description: "contact admin",
      }
    }


    const { data: user, error: signupError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          role: role
        }
      },
    })

    if (signupError) {
      return {
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: signupError.message,
      }
    }

    // const { data: updatedStudent, error } = await supabase
    //   .from('student')
    //   .update({ user_id: user.user?.id })
    //   .eq('id', student[0].id)
    //   .select()

    // if (error) {
    //   console.log(error)
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: error.message,
    //   })
    // } else {
    //   console.log(updatedStudent)
    // }
    redirect(`/student`)

  }

  return {
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: "There was a problem with your request.",
  }
}

