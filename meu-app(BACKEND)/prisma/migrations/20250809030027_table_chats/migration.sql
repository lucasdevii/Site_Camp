-- CreateTable
CREATE TABLE "public"."Chats" (
    "id" SERIAL NOT NULL,
    "conversation" TEXT NOT NULL,
    "idFirstPlayer" INTEGER NOT NULL,
    "idSecondPlayer" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);
