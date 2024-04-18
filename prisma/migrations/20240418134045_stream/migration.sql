-- CreateTable
CREATE TABLE "LiveStream" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "streamKey" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LiveStream_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LiveStream" ADD CONSTRAINT "LiveStream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
