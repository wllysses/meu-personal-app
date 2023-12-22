"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Client } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { registerTraining } from "@/actions/register-training";

interface FormProps {
  session: Session;
  clients: Client[];
}

export function Form({ session, clients }: FormProps) {
  const router = useRouter();

  const [client, setClient] = useState(""); // Select client value

  const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatório"),
  });

  type ValidationSchema = z.infer<typeof schema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });

  const handleCreateTraining: SubmitHandler<ValidationSchema> = async (
    formData
  ) => {
    const trainingData = {
      ...formData,
      user_id: session.user.id,
      client_id: client,
    };

    const training = await registerTraining(trainingData);

    if (!training) {
      toast.error("Erro ao cadastrar o treino");
      return;
    }

    toast.success("Treino cadastrado com sucesso");
    router.refresh();
  };

  return (
    <form
      className="mt-6 w-full flex flex-col gap-4"
      onSubmit={handleSubmit(handleCreateTraining)}
    >
      <div className="flex flex-col">
        <label>Nome</label>
        <Input type="text" placeholder="ex: João" {...register("name")} />
        {errors.name && (
          <span className="mt-2 text-red-500 text-xs">
            {errors.name.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label>Descrição</label>
        <Textarea
          className="resize-none"
          placeholder="ex: Treino com ênfase em peitorl..."
          {...register("description")}
        />
        {errors.description && (
          <span className="mt-2 text-red-500 text-xs">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label>Cliente</label>
        <Select onValueChange={setClient}>
          <SelectTrigger>
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Meus clientes</SelectLabel>
              {clients &&
                clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        className="self-end w-fit font-semibold"
        disabled={!client}
      >
        Cadastrar
      </Button>
    </form>
  );
}
