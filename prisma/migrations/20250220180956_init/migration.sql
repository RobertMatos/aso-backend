-- CreateEnum
CREATE TYPE "TipoExame" AS ENUM ('ADMISSIONAL', 'PERIODICO', 'RETORNO_AO_TRABALHO', 'DEMISSIONAL', 'TRANSFERENCIA_FUNCAO');

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exame" (
    "id" TEXT NOT NULL,
    "tipo" "TipoExame" NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiscoOcupacional" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "RiscoOcupacional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExameToRiscoOcupacional" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExameToRiscoOcupacional_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_cpf_key" ON "Funcionario"("cpf");

-- CreateIndex
CREATE INDEX "_ExameToRiscoOcupacional_B_index" ON "_ExameToRiscoOcupacional"("B");

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExameToRiscoOcupacional" ADD CONSTRAINT "_ExameToRiscoOcupacional_A_fkey" FOREIGN KEY ("A") REFERENCES "Exame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExameToRiscoOcupacional" ADD CONSTRAINT "_ExameToRiscoOcupacional_B_fkey" FOREIGN KEY ("B") REFERENCES "RiscoOcupacional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
