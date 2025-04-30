-- CreateTable
CREATE TABLE "_ExameToRiscoOcupacional" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExameToRiscoOcupacional_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExameToRiscoOcupacional_B_index" ON "_ExameToRiscoOcupacional"("B");

-- AddForeignKey
ALTER TABLE "_ExameToRiscoOcupacional" ADD CONSTRAINT "_ExameToRiscoOcupacional_A_fkey" FOREIGN KEY ("A") REFERENCES "Exame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExameToRiscoOcupacional" ADD CONSTRAINT "_ExameToRiscoOcupacional_B_fkey" FOREIGN KEY ("B") REFERENCES "RiscoOcupacional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
