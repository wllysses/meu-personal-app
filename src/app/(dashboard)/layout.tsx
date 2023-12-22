import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import {
  DumbbellIcon,
  EyeIcon,
  FilePlusIcon,
  HomeIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { nextAuthOption } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { DropdownUser } from "@/components/dropdown-user";

export default async function PrivateDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(nextAuthOption);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex">
      <aside className="max-w-xs w-full border p-4 max-sm:hidden">
        <h3 className="font-bold text-2xl">Dashboard</h3>
        <nav className="mt-8 w-full flex flex-col gap-2">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "justify-start gap-2"
            )}
          >
            <HomeIcon size={18} />
            Página inicial
          </Link>
          <Link
            href="/dashboard/cadastrar-cliente"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "justify-start gap-2"
            )}
          >
            <UserPlusIcon size={18} />
            Cadastrar cliente
          </Link>
          <Link
            href="/dashboard/cadastrar-treino"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "justify-start gap-2"
            )}
          >
            <FilePlusIcon size={18} />
            Cadastrar treino
          </Link>
          <Link
            href="/dashboard/cadastrar-exercicio"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "justify-start gap-2"
            )}
          >
            <DumbbellIcon size={18} />
            Cadastrar exercício
          </Link>
          <Link
            href="/dashboard/visualizar-treinos"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "justify-start gap-2"
            )}
          >
            <EyeIcon size={18} />
            Visualizar treinos
          </Link>
          <Link
            href="/dashboard/clientes"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "justify-start gap-2"
            )}
          >
            <UsersIcon size={18} />
            Visualizar clientes
          </Link>
        </nav>
      </aside>
      <div className="flex-1">
        <header className="py-4 px-8 border w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DumbbellIcon size={20} />
            <h1 className="font-bold text-xl uppercase">
              Meu<span className="text-primary">Personal</span>
            </h1>
          </div>
          <DropdownUser session={session} />
        </header>
        {children}
      </div>
    </div>
  );
}
