import Link from "next/link";
import { getServerSession } from "next-auth";
import { PhoneCallIcon } from "lucide-react";
import { nextAuthOption } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { calculateAndClassifyIMC } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteClientButton } from "./components/delete-client-button";
import { EditClientModal } from "./components/edit-client.modal";

export default async function Clients() {
  const session = await getServerSession(nextAuthOption);
  const clients = await prismaClient.client.findMany({
    where: {
      user_id: session?.user.id,
    },
    include: {
      Training: true,
      Feedback: true,
    },
  });

  return (
    <main className="w-full p-8">
      <h2 className="text-2xl font-bold">Clientes</h2>
      <div className="mt-4 w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Peso</TableHead>
              <TableHead>Altura</TableHead>
              <TableHead>IMC</TableHead>
              <TableHead>Classificação</TableHead>
              <TableHead>Treinos</TableHead>
              <TableHead>Feedbacks</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients &&
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.age}</TableCell>
                  <TableCell>{client.weight}</TableCell>
                  <TableCell>{client.height}</TableCell>
                  <TableCell>
                    {calculateAndClassifyIMC(
                      client.weight,
                      client.height
                    ).imc.toFixed(1)}
                  </TableCell>
                  <TableCell>
                    {
                      calculateAndClassifyIMC(client.weight, client.height)
                        .classify
                    }
                  </TableCell>
                  <TableCell>{client.Training.length}</TableCell>
                  <TableCell>{client.Feedback.length}</TableCell>
                  <TableCell className="flex items-center gap-2 cursor-pointer">
                    <Link href={`tel:+55${client.phone}`}>
                      <PhoneCallIcon size={15} />
                    </Link>
                    <EditClientModal client={client} />
                    <DeleteClientButton clientId={client.id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
