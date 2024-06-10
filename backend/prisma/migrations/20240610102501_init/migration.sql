-- CreateTable
CREATE TABLE "WhitelistedUrl" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "headers" JSON NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhitelistedUrl_pkey" PRIMARY KEY ("id")
);
