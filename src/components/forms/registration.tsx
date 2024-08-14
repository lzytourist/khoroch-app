import Link from "next/link"
import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription, CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import {signup} from "@/actions/auth";
import LoadingButton from "@/components/loading-button";

export default function RegistrationForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signup} method={'post'}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name={'name'} placeholder="Max" required/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name={'email'}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name={'password'} type="password"/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" name={'confirmPassword'} type="password"/>
            </div>
            <LoadingButton>Create account</LoadingButton>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Button asChild variant={'link'} className={'px-0'}>
            <Link href={'/sign-in'}>
              Sign in
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
