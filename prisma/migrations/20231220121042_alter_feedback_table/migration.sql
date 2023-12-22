-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_training_id_fkey";

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
