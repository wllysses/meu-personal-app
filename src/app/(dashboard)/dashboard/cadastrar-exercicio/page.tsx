import { getServerSession } from "next-auth";
import { nextAuthOption } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { RegisterExerciseForm } from "./components/form";

export default async function CreateExercise() {
  const session = await getServerSession(nextAuthOption);

  const trainings = await prismaClient.training.findMany({
    where: {
      user_id: session?.user.id!,
    },
    include: {
      client: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main className="w-full p-8">
      <h2 className="text-2xl font-bold">Cadastrar exercício</h2>
      <RegisterExerciseForm user_id={session?.user.id!} trainings={trainings} />
    </main>
  );
}
