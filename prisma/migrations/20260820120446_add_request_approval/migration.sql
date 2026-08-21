-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "RequestApproval" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actionAt" TIMESTAMP(3),

    CONSTRAINT "RequestApproval_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RequestApproval_requestId_userId_key" ON "RequestApproval"("requestId", "userId");

-- AddForeignKey
ALTER TABLE "RequestApproval" ADD CONSTRAINT "RequestApproval_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Sentrequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestApproval" ADD CONSTRAINT "RequestApproval_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
