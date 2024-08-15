import RegistrationForm from "@/components/forms/registration";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className={'min-h-screen flex flex-col items-center justify-center'}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegistrationForm/>

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
    </main>
  )
}