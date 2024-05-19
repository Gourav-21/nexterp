import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SignupButton() {
  const { pending } = useFormStatus()

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Loading..." : "Sign up"}
        </Button>
    )
}
