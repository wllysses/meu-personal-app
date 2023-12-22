"use server";

import { prismaClient } from "@/lib/prisma";

export async function registerExercise(data: {
  user_id: string;
  training_id: string;
  name: string;
  description: string;
  muscle_groupd: string;
  repetitions: number;
  weight: number;
  series: number;
  pause_time: string;
}) {
  const {
    user_id,
    training_id,
    name,
    description,
    muscle_groupd,
    repetitions,
    weight,
    series,
    pause_time,
  } = data;
  try {
    const trainingExists = await prismaClient.training.findFirst({
      where: {
        id: training_id,
      },
    });

    if (!trainingExists) {
      throw new Error("Este treino não existe ou não está cadastrado");
    }
    const exercise = await prismaClient.exercise.create({
      data: {
        user_id,
        training_id,
        name,
        description,
        muscle_groupd,
        repetitions,
        weight,
        series,
        pause_time,
      },
    });
    return exercise;
  } catch (err) {
    console.log(err);
  }
}
