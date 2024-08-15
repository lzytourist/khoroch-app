import LoginForm from "@/components/forms/login";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className={'min-h-screen flex items-center justify-center'}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm/>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button asChild variant={'link'} className={'px-0'}>
              <Link href={'/sign-up'}>
                Sign up
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}