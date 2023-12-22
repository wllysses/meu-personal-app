"use server";

import { prismaClient } from "@/lib/prisma";

export async function updateClient(client: {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  phone: string;
}) {
  try {
    const clientExists = await prismaClient.client.findUnique({
      where: {
        id: client.id,
      },
    });

    if (!clientExists) {
      throw new Error("Este cliente não existe.");
    }

    const editClient = await prismaClient.client.update({
      where: {
        id: client.id,
      },
      data: {
        name: !client.name ? clientExists?.name : client.name,
        age: !client.age ? clientExists?.age : client.age,
        weight: !client.weight ? clientExists?.weight : client.weight,
        height: !client.height ? clientExists?.height : client.height,
        phone: !client.phone ? clientExists?.phone : client.phone,
      },
    });

    return editClient;
  } catch (err) {
    console.log(err);
  }
}
