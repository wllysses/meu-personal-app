"use server";

import { prismaClient } from "@/lib/prisma";

export async function deleteTraining(trainingId: string) {
  try {
    const training = await prismaClient.training.delete({
      where: {
        id: trainingId,
      },
    });

    return training;
  } catch (err) {
    console.log(err);
  }
}
