import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <main className={'min-h-screen flex items-center justify-center'}>
      <div className={'p-8 space-y-4 text-center'}>
          <h1 className={'text-6xl font-light'}>Welcome to Khoroch</h1>
          <p className={'text-secondary bg-secondary-foreground'}>Keep track of personal expenses.</p>
          <Button asChild variant={'link'}>
            <Link href={'/sign-in'}>
              Get started <ArrowRightIcon/>
            </Link>
          </Button>
      </div>
    </main>
  );
}
