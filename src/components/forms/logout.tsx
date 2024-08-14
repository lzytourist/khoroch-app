import LoadingButton from "@/components/loading-button";
import {LockIcon} from "lucide-react";
import {destroySession} from "@/lib/jwt";
import {redirect} from "next/navigation";

export default async function LogoutForm() {
  const logout = async () => {
    'use server'
    await destroySession();
    redirect('/');
  }

  return (
    <form action={logout}>
      <LoadingButton>
        <div className={'flex items-center gap-2'}>
          <span>Sign out</span>
          <LockIcon/>
        </div>
      </LoadingButton>
    </form>
  )
}