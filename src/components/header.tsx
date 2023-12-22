"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  CalendarDaysIcon,
  DumbbellIcon,
  LayoutDashboard,
  ListIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Card } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ThemeToggle } from "./ui/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export function Header() {
  const { data: session, status } = useSession();

  async function handleGoogleSignIn() {
    await signIn();
  }

  async function handleGoogleSignOut() {
    await signOut();
  }

  return (
    <Card className="p-4 rounded-none">
      <header className="w-full container mx-auto flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="mt-4 w-full">
              {status === "unauthenticated" && (
                <Button
                  className="justify-start gap-2 w-full"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                >
                  <LogInIcon size={18} />
                  Fazer login
                </Button>
              )}
              {status === "authenticated" && (
                <>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>{session.user?.name![0]}</AvatarFallback>
                      {session.user?.image && (
                        <AvatarImage
                          src={session.user?.image}
                          alt="Google Profile Avatar"
                        />
                      )}
                    </Avatar>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        Bem-vindo(a)!
                      </span>
                      <h4 className="font-semibold">{session.user?.name}</h4>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "mt-4 justify-start gap-2 w-full"
                    )}
                  >
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                  <Separator className="my-4" />
                  <Button
                    variant="destructive"
                    className="gap-2 w-full"
                    onClick={handleGoogleSignOut}
                  >
                    <LogOutIcon size={18} />
                    Sair
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <DumbbellIcon size={20} />
          <h1 className="font-bold text-xl uppercase">
            Meu<span className="text-primary">Personal</span>
          </h1>
        </div>
        <ThemeToggle />
      </header>
    </Card>
  );
}
