/*
  Warnings:

  - You are about to drop the `Friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Friends" DROP CONSTRAINT "Friends_idFirstPlayer_fkey";

-- DropForeignKey
ALTER TABLE "public"."Friends" DROP CONSTRAINT "Friends_idSecondPlayer_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."Friends";

-- CreateTable
CREATE TABLE "public"."FriendsStatus" (
    "id" SERIAL NOT NULL,
    "idFirstPlayer" INTEGER NOT NULL,
    "idSecondPlayer" INTEGER NOT NULL,
    "status" "public"."FriendshipStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FriendsStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."FriendsStatus" ADD CONSTRAINT "FriendsStatus_idFirstPlayer_fkey" FOREIGN KEY ("idFirstPlayer") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FriendsStatus" ADD CONSTRAINT "FriendsStatus_idSecondPlayer_fkey" FOREIGN KEY ("idSecondPlayer") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
