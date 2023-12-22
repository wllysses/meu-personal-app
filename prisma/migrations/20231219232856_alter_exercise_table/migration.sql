-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_training_id_fkey";

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
