"use client";

import { toast } from "react-toastify";
import { Exercise } from "@prisma/client";
import { FolderOpenIcon, TrashIcon } from "lucide-react";
import deleteExercise from "@/actions/delete-exercise";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface ModalProps {
  exercises: Exercise[];
}

export function ViewTrainingModal({ exercises }: ModalProps) {
  const router = useRouter();

  async function handleDeleteExercise(exerciseId: string) {
    if (confirm("Deseja deletar o exercício?")) {
      const remove = await deleteExercise(exerciseId);

      if (!remove) {
        toast.error("Deleção do exercício falhou");
        return;
      }

      toast.success("Exercício deletado com sucesso.");
      router.refresh();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <FolderOpenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold border-b pb-2">
            Exercícios do treino
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
          {!exercises.length && <span>Nenhum exercício cadastrado</span>}
          {exercises &&
            exercises.map((exercise) => (
              <Card key={exercise.id} className="p-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      {exercise.description}
                    </p>
                  </div>
                  <TrashIcon
                    className="text-red-500 cursor-pointer"
                    size={18}
                    onClick={() => handleDeleteExercise(exercise.id)}
                  />
                </div>
                <div className="mt-2 w-full flex items-center gap-3">
                  <span className="text-xs">
                    Repetições: {exercise.repetitions}
                  </span>{" "}
                  |<span className="text-xs">Carga: {exercise.weight}kg</span> |
                  <span className="text-xs">Séries: {exercise.series}</span> |
                  <span className="text-xs">
                    Descanso: {exercise.pause_time}s
                  </span>
                </div>
              </Card>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
