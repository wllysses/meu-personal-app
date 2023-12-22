"use server";

import { prismaClient } from "@/lib/prisma";

export async function registerClient(data: {
  user_id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  phone: string;
}) {
  const { user_id, name, age, weight, height, phone } = data;
  try {
    const clientExists = await prismaClient.client.findFirst({
      where: {
        name: data.name,
      },
    });

    if (clientExists) {
      throw new Error("Cliente já cadastrado com esse nome.");
    }
    const client = await prismaClient.client.create({
      data: {
        user_id,
        name,
        age,
        weight,
        height,
        phone,
      },
    });
    return client;
  } catch (err) {
    console.log(err);
  }
}
