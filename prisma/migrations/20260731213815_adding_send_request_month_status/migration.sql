-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Sentrequest" ADD COLUMN     "actionAt" TIMESTAMP(3),
ADD COLUMN     "status" "RequestStatus" NOT NULL DEFAULT 'PENDING';
