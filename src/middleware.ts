import {NextRequest, NextResponse} from "next/server";
import {updateSession} from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return await updateSession(request);
  }
  return NextResponse.next();
}