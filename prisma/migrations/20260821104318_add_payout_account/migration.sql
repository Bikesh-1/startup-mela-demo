-- CreateEnum
CREATE TYPE "PayoutType" AS ENUM ('UPI', 'BANK');

-- CreateTable
CREATE TABLE "PayoutAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "PayoutType" NOT NULL,
    "upiId" TEXT,
    "accountHolderName" TEXT,
    "accountNumber" TEXT,
    "ifsc" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayoutAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PayoutAccount_userId_key" ON "PayoutAccount"("userId");

-- AddForeignKey
ALTER TABLE "PayoutAccount" ADD CONSTRAINT "PayoutAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
