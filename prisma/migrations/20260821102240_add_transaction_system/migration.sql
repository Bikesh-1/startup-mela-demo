-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('CONTRIBUTION', 'PAYOUT', 'REFUND');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "groupId" TEXT,
    "senderId" TEXT,
    "receiverId" TEXT,
    "amount" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "requestId" TEXT,
    "provider" TEXT,
    "providerReference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Transaction_groupId_idx" ON "Transaction"("groupId");

-- CreateIndex
CREATE INDEX "Transaction_senderId_idx" ON "Transaction"("senderId");

-- CreateIndex
CREATE INDEX "Transaction_receiverId_idx" ON "Transaction"("receiverId");

-- CreateIndex
CREATE INDEX "Transaction_requestId_idx" ON "Transaction"("requestId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Sentrequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
