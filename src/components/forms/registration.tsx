'use client'

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import {signup} from "@/actions/auth";
import LoadingButton from "@/components/loading-button";
import {useFormState} from "react-dom";
import FieldError from "@/components/field-error";

export default function RegistrationForm() {
  const [state, action] = useFormState(signup, null);

  return (
    <form action={action} method={'post'}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name={'name'} placeholder="Max" required/>
          {state?.name && <FieldError message={state.name}/>}
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
          {state?.email && <FieldError message={state.email}/>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name={'password'} type="password"/>
          {state?.password && <FieldError message={state.password}/>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" name={'confirmPassword'} type="password"/>
          {state?.confirmPassword && <FieldError message={state.confirmPassword}/>}
        </div>
        <LoadingButton>Create account</LoadingButton>
      </div>
    </form>
  )
}
