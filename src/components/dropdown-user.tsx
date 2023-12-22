"use client";

import Link from "next/link";
import {
  ChevronDownIcon,
  DumbbellIcon,
  EyeIcon,
  FilePlusIcon,
  HomeIcon,
  LogOut,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface DropdownUserProps {
  session: Session;
}

export function DropdownUser({ session }: DropdownUserProps) {
  async function handleGoogleSignOut() {
    await signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-4">
          <Avatar>
            <AvatarFallback>{session.user?.name![0]}</AvatarFallback>
            {session.user?.image && (
              <AvatarImage
                src={session.user?.image}
                alt="Google Profile Avatar"
              />
            )}
          </Avatar>
          {session.user?.name}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/">
            <DropdownMenuItem>
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>Página inicial</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/cadastrar-cliente">
            <DropdownMenuItem>
              <UserPlusIcon className="mr-2 h-4 w-4" />
              <span>Cadastrar cliente</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/cadastrar-treino">
            <DropdownMenuItem>
              <FilePlusIcon className="mr-2 h-4 w-4" />
              <span>Cadastrar treino</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/cadastrar-exercicio">
            <DropdownMenuItem>
              <DumbbellIcon className="mr-2 h-4 w-4" />
              <span>Cadastrar exercício</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/visualizar-treinos">
            <DropdownMenuItem>
              <EyeIcon className="mr-2 h-4 w-4" />
              <span>Visualizar treinos</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/clientes">
            <DropdownMenuItem>
              <UsersIcon className="mr-2 h-4 w-4" />
              <span>Visualizar clientes</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleGoogleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
