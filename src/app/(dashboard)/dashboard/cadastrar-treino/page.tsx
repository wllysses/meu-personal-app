import { getServerSession } from "next-auth";
import { nextAuthOption } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { Form } from "./components/form";

export default async function CreateTraining() {
  const session = await getServerSession(nextAuthOption);

  const clients = await prismaClient.client.findMany({
    where: {
      user_id: session?.user.id,
    },
  });

  return (
    <main className="w-full p-8">
      <h2 className="text-2xl font-bold">Cadastrar treino</h2>
      <Form session={session!} clients={clients} />
    </main>
  );
}
