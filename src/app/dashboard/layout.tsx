import {ReactNode} from "react";
import Link from "next/link";
import {Bell, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import LogoutForm from "@/components/forms/logout";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {getSession} from "@/lib/jwt";
import {headers} from "next/headers";

export default async function Layout({children}: {children: ReactNode}) {
  const session = await getSession();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6"/>
              <span className="">Khoroch</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4"/>
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href={'/dashboard'}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground"
              >
                <Home className="h-4 w-4"/>
                Dashboard
              </Link>
              <Link
                href={'/dashboard/transactions'}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground"
                // className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary bg-muted text-primary"
              >
                <Package className="h-4 w-4"/>
                Transactions
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <LogoutForm/>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5"/>
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href={'/'}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6"/>
                  <span>Khoroch</span>
                </Link>
                <Link
                  href={'/dashboard'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5"/>
                  Dashboard
                </Link>
                <Link
                  href={'/dashboard/transactions'}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5"/>
                  Transaction
                </Link>
              </nav>
              <div className="mt-auto">
                <LogoutForm/>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <h1>Welcome <span className={'font-bold'}>{
                  // @ts-ignore
                  session.user.name
                }</span></h1>
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5"/>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}