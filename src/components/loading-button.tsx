'use client'

import {Button} from "@/components/ui/button";
import {ReactNode} from "react";
import {useFormStatus} from "react-dom";
import {ReloadIcon} from "@radix-ui/react-icons";

export default function LoadingButton({children}: { children: ReactNode }) {
  const {pending} = useFormStatus();
  return (
    <Button
      disabled={pending}
      type={"submit"}
      className={'w-full flex items-center gap-2'}>
      <span>{children}</span>
      {pending && <ReloadIcon className={'animate-spin'}/>}
    </Button>
  )
}