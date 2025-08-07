-- CreateEnum
CREATE TYPE "public"."FriendshipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'BLOCKED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "details" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Friends" (
    "id" SERIAL NOT NULL,
    "idFirstPlayer" INTEGER NOT NULL,
    "idSecondPlayer" INTEGER NOT NULL,
    "status" "public"."FriendshipStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Friends" ADD CONSTRAINT "Friends_idFirstPlayer_fkey" FOREIGN KEY ("idFirstPlayer") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Friends" ADD CONSTRAINT "Friends_idSecondPlayer_fkey" FOREIGN KEY ("idSecondPlayer") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
