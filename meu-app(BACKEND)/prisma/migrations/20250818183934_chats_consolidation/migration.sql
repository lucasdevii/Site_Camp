/*
  Warnings:

  - You are about to drop the `Chats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Chats";

-- CreateTable
CREATE TABLE "public"."ChatInfos" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "ChatInfos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatParticipants" (
    "id" SERIAL NOT NULL,
    "chatRoomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ChatParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatTalks" (
    "id" SERIAL NOT NULL,
    "conversation" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "chatRoomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatTalks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ChatParticipants" ADD CONSTRAINT "ChatParticipants_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "public"."ChatInfos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatTalks" ADD CONSTRAINT "ChatTalks_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "public"."ChatInfos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
