'use server'

import {SignInSchema, SignUpSchema} from "@/lib/definitions";
import {prisma} from "@/lib/db";
import {hash, compare} from "bcrypt";
import {redirect} from "next/navigation";
import {createSession, destroySession} from "@/lib/jwt";
import {NextResponse} from "next/server";

export async function signup(formData: FormData) {
  const validation = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (validation.success) {
    const hashedPassword = await hash(validation.data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        password: hashedPassword
      }
    });

    await createSession({id: user.id, email: user.email, name: user.name});

    redirect('/dashboard');
  }
}

export async function signin(prev: any, formData: FormData) {
  const validation = SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (validation.success) {
    const user = await prisma.user.findFirst({
      where: {
        email: validation.data.email,
      },
    });

    if (user && await compare(validation.data.password, user.password)) {
      await createSession({name: user.name, email: user.email, id: user.id});
      redirect('/dashboard');
    }
  }

  return {
    message: 'Wrong credentials'
  };
}

export async function signout(formData: FormData) {
  await destroySession();
  const res = NextResponse.next();
  res.cookies.set('session', '', {expires: new Date(0)});
  return res;
}