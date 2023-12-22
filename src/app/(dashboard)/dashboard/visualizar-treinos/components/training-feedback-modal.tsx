import { MessageSquareIcon } from "lucide-react";
import { Feedback } from "@prisma/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props extends Feedback {
  client: {
    name: string;
  };
}

interface TrainingFeedbackModalProps {
  feedbacks: Props[];
}

export function TrainingFeedbackModal({
  feedbacks,
}: TrainingFeedbackModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Visualizar feedbacks">
          <MessageSquareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold border-b pb-2">
            Feedbacks do treino
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
          {!feedbacks.length && <span>Nenhum feedback cadastrado</span>}
          {feedbacks &&
            feedbacks.map((feedback) => (
              <Card key={feedback.id} className="p-4">
                <div className="w-full flex items-center border-b pb-2 gap-2">
                  <Avatar>
                    <AvatarFallback>{feedback.client.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="w-fit font-semibold">
                      {feedback.client.name}
                    </h4>
                    <span className="text-muted-foreground text-xs">
                      em{" "}
                      {new Date(feedback.created_at).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-muted-foreground">{feedback.comment}</p>
              </Card>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
