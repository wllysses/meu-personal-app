"use server";

import { prismaClient } from "@/lib/prisma";

export default async function deleteExercise(exerciseId: string) {
  try {
    const exercise = await prismaClient.exercise.delete({
      where: {
        id: exerciseId,
      },
    });
    return exercise;
  } catch (err) {
    console.log(err);
  }
}
