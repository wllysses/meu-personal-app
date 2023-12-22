"use client";

import { EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Client } from "@prisma/client";
import { updateClient } from "@/actions/update-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

interface Props {
  client: Client;
}

export function EditClientModal({ client }: Props) {
  const router = useRouter();

  //const { data: session } = useSession();

  const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    age: z
      .string()
      .min(1, "Idade é obrigatório")
      .transform((data) => parseInt(data)),
    weight: z
      .string()
      .min(1, "Peso é obrigatório")
      .transform((data) => parseFloat(data)),
    height: z
      .string()
      .min(1, "Altura é obrigatório")
      .transform((data) => parseFloat(data)),
    phone: z.string().min(1, "Telefone é obrigatório"),
  });

  type ValidationSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });

  const handleUpdateClient: SubmitHandler<ValidationSchema> = async (
    formData
  ) => {
    const clientData = {
      ...formData,
      id: client?.id,
    };

    const update = await updateClient(clientData);

    if (!update) {
      toast.error("Atualização do cliente falhou.");
      return;
    }

    toast.success("Cliente atualizado com sucesso.");
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <EditIcon size={15} />
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold border-b pb-2">
            Editar cliente
          </DialogTitle>
        </DialogHeader>
        <form
          className="mt-2 w-full flex flex-col gap-4"
          onSubmit={handleSubmit(handleUpdateClient)}
        >
          <div className="grid grid-cols-2 gap-6 max-[470px]:grid-cols-1">
            <div className="flex flex-col">
              <label>Nome</label>
              <Input
                type="text"
                placeholder="ex: João"
                defaultValue={client.name}
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label>Idade</label>
              <Input
                type="text"
                placeholder="ex: 19"
                defaultValue={client.age}
                {...register("age")}
              />
              {errors.age && (
                <span className="text-red-500 text-xs">
                  {errors.age.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 max-[470px]:grid-cols-1">
            <div className="flex flex-col">
              <label>Peso</label>
              <Input
                type="text"
                placeholder="ex: 67.4"
                defaultValue={client.weight}
                {...register("weight")}
              />
              {errors.weight && (
                <span className="text-red-500 text-xs">
                  {errors.weight.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label>Altura</label>
              <Input
                type="text"
                placeholder="ex: 1.78"
                defaultValue={client.height}
                {...register("height")}
              />
              {errors.height && (
                <span className="text-red-500 text-xs">
                  {errors.height.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label>Telefone</label>
              <Input
                type="text"
                placeholder="ex: 83988776655"
                defaultValue={client.phone}
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>
          <Button type="submit" className="mt-4 self-end w-fit font-semibold">
            Atualizar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
