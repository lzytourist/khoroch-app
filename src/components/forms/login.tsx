import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoadingButton from "@/components/loading-button";
import {signin} from "@/actions/auth";

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signin}>
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
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Button asChild variant={'link'} className={'px-0'}>
            <Link href={'/sign-up'}>
              Sign up
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
