"use server";

import { prismaClient } from "@/lib/prisma";

export async function deleteClient(clientId: string) {
  try {
    const client = prismaClient.client.delete({
      where: {
        id: clientId,
      },
    });
    return client;
  } catch (err) {
    console.log(err);
  }
}
