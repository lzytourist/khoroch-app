import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('5 min from now')
    .sign(key);
}

export async function decrypt(input: string) {
  const {payload} = await jwtVerify(input, key, {
    algorithms: ['HS256']
  });
  return payload;
}

export async function createSession(user: { id: string, name?: string | null, email: string }) {
  const expires = new Date(Date.now() + 5 * 60 * 1000);
  const session = await encrypt({user});

  cookies().set('session', session, {expires, httpOnly: true, sameSite: 'strict'});
}

export async function destroySession() {
  cookies().set('session', '', {expires: new Date(0)});
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) {
    return;
  }
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const parsed = await decrypt(session);

  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 60 * 1000),
    sameSite: 'strict'
  });

  return res;
}