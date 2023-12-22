"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Training } from "@prisma/client";
import exercises from "@/mocks/exercicios.json";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { registerExercise } from "@/actions/register-exercise";

interface TrainingProps extends Training {
  client: {
    name: string;
  };
}

interface FormProps {
  user_id: string;
  trainings: TrainingProps[];
}

export function RegisterExerciseForm({ user_id, trainings }: FormProps) {
  const router = useRouter();

  const schema = z.object({
    training_id: z.string({
      required_error: "Treino é obrigatório",
    }),
    name: z.string({
      required_error: "Exercício é obrigatório",
    }),
    description: z
      .string({
        required_error: "Descrição é obrigatória",
      })
      .min(1, { message: "Descrição é obrigatória" }),
    muscle_groupd: z.string({
      required_error: "Grupamento muscular é obrigatório",
    }),
    repetitions: z
      .string({
        required_error: "Repetições é obrigatório",
      })
      .transform((data) => parseInt(data)),
    weight: z
      .string({
        required_error: "Carga é obrigatória",
      })
      .transform((data) => parseInt(data)),
    series: z
      .string({
        required_error: "Séries é obrigatória",
      })
      .transform((data) => parseInt(data)),
    pause_time: z.string({
      required_error: "Tempo de descanso é obrigatório",
    }),
  });

  type ValidationSchema = z.infer<typeof schema>;

  const form = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });

  const handleRegisterExerciseInTraining: SubmitHandler<
    ValidationSchema
  > = async (formData) => {
    const exerciseData = {
      ...formData,
      user_id,
    };

    const exercise = await registerExercise(exerciseData);

    if (!exercise) {
      toast.error("Erro ao cadastrar o exercício");
      return;
    }

    toast.success("Exercício cadastrado com sucesso.");
    router.refresh();
  };

  return (
    <>
      <Form {...form}>
        <form
          className="mt-6 w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleRegisterExerciseInTraining)}
        >
          <FormField
            control={form.control}
            name="training_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Escolha o treino</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Treino</SelectLabel>
                        {trainings &&
                          trainings.map((training) => (
                            <SelectItem key={training.id} value={training.id}>
                              {training.name} - {training.client.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-4" />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercício</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Peitoral</SelectLabel>
                        {exercises.exercicios_peitoral &&
                          exercises.exercicios_peitoral.map(
                            (exercicio, index) => (
                              <SelectItem key={index} value={exercicio.nome}>
                                {exercicio.nome}
                              </SelectItem>
                            )
                          )}
                      </SelectGroup>
                      <Separator className="mt-2" />
                      <SelectGroup>
                        <SelectLabel>Triceps</SelectLabel>
                        {exercises.exercicios_triceps &&
                          exercises.exercicios_triceps.map(
                            (exercicio, index) => (
                              <SelectItem key={index} value={exercicio.nome}>
                                {exercicio.nome}
                              </SelectItem>
                            )
                          )}
                      </SelectGroup>
                      <Separator className="mt-2" />
                      <SelectGroup>
                        <SelectLabel>Dorsal</SelectLabel>
                        {exercises.exercicios_dorsal &&
                          exercises.exercicios_dorsal.map(
                            (exercicio, index) => (
                              <SelectItem key={index} value={exercicio.nome}>
                                {exercicio.nome}
                              </SelectItem>
                            )
                          )}
                      </SelectGroup>
                      <Separator className="mt-2" />
                      <SelectGroup>
                        <SelectLabel>Biceps</SelectLabel>
                        {exercises.exercicios_biceps &&
                          exercises.exercicios_biceps.map(
                            (exercicio, index) => (
                              <SelectItem key={index} value={exercicio.nome}>
                                {exercicio.nome}
                              </SelectItem>
                            )
                          )}
                      </SelectGroup>
                      <Separator className="mt-2" />
                      <SelectGroup>
                        <SelectLabel>Deltoides</SelectLabel>
                        {exercises.exercicios_ombros &&
                          exercises.exercicios_ombros.map(
                            (exercicio, index) => (
                              <SelectItem key={index} value={exercicio.nome}>
                                {exercicio.nome}
                              </SelectItem>
                            )
                          )}
                      </SelectGroup>
                      <Separator className="mt-2" />
                      <SelectGroup>
                        <SelectLabel>Abdmomen</SelectLabel>
                        {exercises.exercicios_abdominais &&
                          exercises.exercicios_abdominais.map(
                            (exercicio, index) => (
                              <SelectItem key={index} value={exercicio.nome}>
                                {exercicio.nome}
                              </SelectItem>
                            )
                          )}
                      </SelectGroup>
                      <Separator className="mt-2" />
                      <SelectGroup>
                        <SelectLabel>Quadriceps</SelectLabel>
                        {exercises.exercicios_quadriceps &&
                          exercises.exercicios_quadriceps.map(
                            (exercicio, index) => (
                              <SelectItem key={index} value={exercicio.nome}>
                                {exercicio.nome}
                              </SelectItem>
                            )
                          )}
                      </SelectGroup>
                      <Separator className="mt-2" />
                      <SelectGroup>
                        <SelectLabel>Posterior de Coxa</SelectLabel>
                        {exercises.exercicios_posterior_coxa &&
                          exercises.exercicios_posterior_coxa.map(
                            (exercicio, index) => (
                              <SelectItem key={index} value={exercicio.nome}>
                                {exercicio.nome}
                              </SelectItem>
                            )
                          )}
                      </SelectGroup>
                      <Separator className="mt-2" />
                      <SelectGroup>
                        <SelectLabel>Panturrilhas</SelectLabel>
                        {exercises.exercicios_panturrilhas &&
                          exercises.exercicios_panturrilhas.map(
                            (exercicio, index) => (
                              <SelectItem key={index} value={exercicio.nome}>
                                {exercicio.nome}
                              </SelectItem>
                            )
                          )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="ex: exercício voltado para a parte superior do peitoral"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="muscle_groupd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grupamento muscular</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Membros superiores</SelectLabel>
                        <SelectItem value="peitoral">Peitoral</SelectItem>
                        <SelectItem value="triceps">Triceps</SelectItem>
                        <SelectItem value="biceps">Biceps</SelectItem>
                        <SelectItem value="dorsal">Dorsal</SelectItem>
                        <SelectItem value="deltoides">
                          Deltoides (ombros)
                        </SelectItem>
                        <SelectItem value="abdomen">Abdomen</SelectItem>
                      </SelectGroup>
                      <Separator className="mt-2" />
                      <SelectGroup>
                        <SelectLabel>Membros inferiores</SelectLabel>
                        <SelectItem value="quadriceps">Quadriceps</SelectItem>
                        <SelectItem value="posterior">
                          Posterior de coxa
                        </SelectItem>
                        <SelectItem value="panturrilha">
                          Panturrilhas
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full grid grid-cols-4 gap-4 max-sm:grid-cols-1">
            <FormField
              control={form.control}
              name="repetitions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repetições</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="ex: 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="ex: 30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="series"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Séries</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="ex: 4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pause_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo de descanso</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tempo</SelectLabel>
                          <SelectItem value="30">30s</SelectItem>
                          <SelectItem value="60">1min</SelectItem>
                          <SelectItem value="90">1min30s</SelectItem>
                          <SelectItem value="120">2min</SelectItem>
                          <SelectItem value="150">2min30s</SelectItem>
                          <SelectItem value="180">3min</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="font-semibold w-fit self-end">
            Cadastrar
          </Button>
        </form>
      </Form>
    </>
  );
}
