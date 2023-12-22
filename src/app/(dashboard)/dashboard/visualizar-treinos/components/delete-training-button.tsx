"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TrashIcon } from "lucide-react";
import { deleteTraining } from "@/actions/delete-training";
import { Button } from "@/components/ui/button";

interface DeleteTrainingButtonProps {
  trainingId: string;
}

export function DeleteTrainingButton({
  trainingId,
}: DeleteTrainingButtonProps) {
  const router = useRouter();

  async function handleDeleteTraining() {
    if (confirm("Deseja deletar o treino?")) {
      const remove = await deleteTraining(trainingId);

      if (!remove) {
        toast.error("Deleção do treino falhou.");
        return;
      }

      toast.success("Treino deletado com sucesso.");
      router.refresh();
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      title="Deletar traino"
      onClick={handleDeleteTraining}
    >
      <TrashIcon className="text-red-500" />
    </Button>
  );
}
