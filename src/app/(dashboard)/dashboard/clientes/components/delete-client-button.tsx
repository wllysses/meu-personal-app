"use client";

import { deleteClient } from "@/actions/delete-client";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteClientButtonProps {
  clientId: string;
}

export function DeleteClientButton({ clientId }: DeleteClientButtonProps) {
  const router = useRouter();

  async function handleDeleteClient() {
    if (confirm("Deseja deletar o cliente?")) {
      const remove = await deleteClient(clientId);

      if (!remove) {
        toast.error("Deleção do cliente falhou.");
        return;
      }

      toast.success("Cliente deletado com sucesso.");
      router.refresh();
    }
  }

  return (
    <TrashIcon
      size={15}
      className="text-red-500"
      onClick={handleDeleteClient}
    />
  );
}
