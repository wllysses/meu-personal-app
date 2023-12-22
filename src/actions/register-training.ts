"use server";

import { prismaClient } from "@/lib/prisma";

export async function registerTraining(data: {
  user_id: string;
  client_id: string;
  name: string;
  description: string;
}) {
  const { user_id, client_id, name, description } = data;
  try {
    const clientExists = await prismaClient.client.findFirst({
      where: {
        id: client_id,
      },
    });

    if (!clientExists) {
      throw new Error("Este cliente não existe ou não está cadastrado");
    }
    const training = await prismaClient.training.create({
      data: {
        user_id,
        client_id,
        name,
        description,
      },
    });
    return training;
  } catch (err) {
    console.log(err);
  }
}
