-- AlterTable
ALTER TABLE "WhitelistedUrl" ALTER COLUMN "headers" SET DATA TYPE JSONB;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "points" BIGINT NOT NULL DEFAULT 0,
    "role" TEXT NOT NULL DEFAULT 'user',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");
