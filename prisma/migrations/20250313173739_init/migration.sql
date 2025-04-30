/*
  Warnings:

  - You are about to alter the column `nome` on the `Empresa` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cnpj` on the `Empresa` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(18)`.
  - You are about to alter the column `nome` on the `Funcionario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cpf` on the `Funcionario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(14)`.
  - You are about to alter the column `nome` on the `RiscoOcupacional` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `_ExameToRiscoOcupacional` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dataNascimento` to the `Funcionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusFuncionario" AS ENUM ('ATIVO', 'DEMITIDO', 'AFASTADO');

-- CreateEnum
CREATE TYPE "ResultadoAtestado" AS ENUM ('APTO', 'APTO_COM_RESTRICAO', 'INAPTO');

-- DropForeignKey
ALTER TABLE "_ExameToRiscoOcupacional" DROP CONSTRAINT "_ExameToRiscoOcupacional_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExameToRiscoOcupacional" DROP CONSTRAINT "_ExameToRiscoOcupacional_B_fkey";

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "email" VARCHAR(255),
ADD COLUMN     "telefone" VARCHAR(15),
ALTER COLUMN "nome" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cnpj" SET DATA TYPE VARCHAR(18);

-- AlterTable
ALTER TABLE "Exame" ADD COLUMN     "dataExame" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "medicoId" TEXT,
ADD COLUMN     "resultado" "ResultadoAtestado";

-- AlterTable
ALTER TABLE "Funcionario" ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "StatusFuncionario" NOT NULL,
ADD COLUMN     "telefone" VARCHAR(15),
ALTER COLUMN "nome" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(14);

-- AlterTable
ALTER TABLE "RiscoOcupacional" ALTER COLUMN "nome" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "_ExameToRiscoOcupacional";

-- CreateTable
CREATE TABLE "Medico" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "crm" VARCHAR(20) NOT NULL,
    "telefone" VARCHAR(15),
    "email" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exame_RiscoOcupacional" (
    "exameId" TEXT NOT NULL,
    "riscoOcupacionalId" TEXT NOT NULL,

    CONSTRAINT "Exame_RiscoOcupacional_pkey" PRIMARY KEY ("exameId","riscoOcupacionalId")
);

-- CreateTable
CREATE TABLE "Atestado" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diasAfastamento" INTEGER,
    "exameId" TEXT NOT NULL,

    CONSTRAINT "Atestado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medico_crm_key" ON "Medico"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "Atestado_exameId_key" ON "Atestado"("exameId");

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame_RiscoOcupacional" ADD CONSTRAINT "Exame_RiscoOcupacional_exameId_fkey" FOREIGN KEY ("exameId") REFERENCES "Exame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame_RiscoOcupacional" ADD CONSTRAINT "Exame_RiscoOcupacional_riscoOcupacionalId_fkey" FOREIGN KEY ("riscoOcupacionalId") REFERENCES "RiscoOcupacional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atestado" ADD CONSTRAINT "Atestado_exameId_fkey" FOREIGN KEY ("exameId") REFERENCES "Exame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
