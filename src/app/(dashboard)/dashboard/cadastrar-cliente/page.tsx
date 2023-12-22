"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { registerClient } from "@/actions/register-client";

export default function CreateClient() {
  const router = useRouter();

  const { data: session } = useSession();

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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });

  const handleCreateClient: SubmitHandler<ValidationSchema> = async (
    formData
  ) => {
    const clientData = {
      ...formData,
      user_id: session?.user?.id!,
    };

    const client = await registerClient(clientData);

    if (!client) {
      toast.error("Erro ao cadastrar um novo cliente.");
      return;
    }

    toast.success("Cliente cadastrado com sucesso.");
    router.refresh();
  };

  return (
    <main className="w-full p-8">
      <h2 className="text-2xl font-bold">Cadastrar cliente</h2>
      <form
        className="mt-6 w-full flex flex-col gap-4"
        onSubmit={handleSubmit(handleCreateClient)}
      >
        <div className="grid grid-cols-2 gap-6 max-[470px]:grid-cols-1">
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
            <label>Idade</label>
            <Input type="text" placeholder="ex: 19" {...register("age")} />
            {errors.age && (
              <span className="mt-2 text-red-500 text-xs">
                {errors.age.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 max-[470px]:grid-cols-1">
          <div className="flex flex-col">
            <label>Peso</label>
            <Input type="text" placeholder="ex: 67.4" {...register("weight")} />
            {errors.weight && (
              <span className="mt-2 text-red-500 text-xs">
                {errors.weight.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label>Altura</label>
            <Input type="text" placeholder="ex: 1.78" {...register("height")} />
            {errors.height && (
              <span className="mt-2 text-red-500 text-xs">
                {errors.height.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label>Telefone</label>
            <Input
              type="text"
              placeholder="ex: 83988776655"
              {...register("phone")}
            />
            {errors.phone && (
              <span className="mt-2 text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
        <Button type="submit" className="self-end w-fit font-semibold">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}
