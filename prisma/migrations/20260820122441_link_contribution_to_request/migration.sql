-- AlterTable
ALTER TABLE "Contribution" ADD COLUMN     "requestId" TEXT;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Sentrequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
