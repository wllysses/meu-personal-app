import { getServerSession } from "next-auth";
import { nextAuthOption } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { DeleteTrainingButton } from "./components/delete-training-button";
import { ViewTrainingModal } from "./components/modal";
import { TrainingFeedbackModal } from "./components/training-feedback-modal";

export default async function ViewTrainings() {
  const session = await getServerSession(nextAuthOption);

  const trainings = await prismaClient.training.findMany({
    where: {
      user_id: session?.user?.id,
    },
    include: {
      client: {
        select: {
          name: true,
        },
      },
      Exercise: true,
      Feedback: {
        include: {
          client: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <main className="w-full p-8">
      <h2 className="text-2xl font-bold">Visualizar treinos</h2>
      <div className="mt-4 w-full flex flex-col gap-4">
        {!trainings.length && <span>Nenhum treino cadastrado</span>}
        {trainings &&
          trainings.map((training) => (
            <Card
              key={training.id}
              className="flex items-center justify-between p-4"
            >
              <h3 className="font-semibold text-lg">
                {training.name} ({training.client.name}) -{" "}
                {new Date(training.created_at).toLocaleDateString("pt-BR")}
              </h3>
              <div className="flex items-center gap-2 cursor-pointer">
                <ViewTrainingModal exercises={training.Exercise} />
                <TrainingFeedbackModal feedbacks={training.Feedback} />
                <DeleteTrainingButton trainingId={training.id} />
              </div>
            </Card>
          ))}
      </div>
    </main>
  );
}
