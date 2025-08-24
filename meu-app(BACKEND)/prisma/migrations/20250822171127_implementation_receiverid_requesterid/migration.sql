/*
  Warnings:

  - The primary key for the `ChatInfos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idFirstPlayer` on the `FriendsStatus` table. All the data in the column will be lost.
  - You are about to drop the column `idSecondPlayer` on the `FriendsStatus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requesterId,receiverId]` on the table `FriendsStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverId` to the `FriendsStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterId` to the `FriendsStatus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ChatParticipants" DROP CONSTRAINT "ChatParticipants_chatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ChatTalks" DROP CONSTRAINT "ChatTalks_chatRoomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FriendsStatus" DROP CONSTRAINT "FriendsStatus_idFirstPlayer_fkey";

-- DropForeignKey
ALTER TABLE "public"."FriendsStatus" DROP CONSTRAINT "FriendsStatus_idSecondPlayer_fkey";

-- AlterTable
ALTER TABLE "public"."ChatInfos" DROP CONSTRAINT "ChatInfos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ChatInfos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ChatInfos_id_seq";

-- AlterTable
ALTER TABLE "public"."ChatParticipants" ALTER COLUMN "chatRoomId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."ChatTalks" ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ALTER COLUMN "chatRoomId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."FriendsStatus" DROP COLUMN "idFirstPlayer",
DROP COLUMN "idSecondPlayer",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "requesterId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FriendsStatus_requesterId_receiverId_key" ON "public"."FriendsStatus"("requesterId", "receiverId");

-- AddForeignKey
ALTER TABLE "public"."FriendsStatus" ADD CONSTRAINT "FriendsStatus_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "public"."User"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FriendsStatus" ADD CONSTRAINT "FriendsStatus_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatParticipants" ADD CONSTRAINT "ChatParticipants_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "public"."ChatInfos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatTalks" ADD CONSTRAINT "ChatTalks_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "public"."ChatInfos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
