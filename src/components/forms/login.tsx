'use client'

import Link from "next/link"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import LoadingButton from "@/components/loading-button";
import {signin} from "@/actions/auth";
import {useFormState} from "react-dom";
import {useEffect} from "react";
import {toast} from "@/components/ui/use-toast";

export default function LoginForm() {
  const [state, action] = useFormState(signin, null);

  useEffect(() => {
    if (state && state?.message) {
      toast({
        title: state.message,
        variant: 'destructive'
      });
    }
  }, [state]);

  return (
    <form action={action}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name={'email'}
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" name={'password'} type="password" required/>
        </div>
        <LoadingButton>Sign in</LoadingButton>
      </div>
    </form>
  );
}
