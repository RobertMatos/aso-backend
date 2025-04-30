/*
  Warnings:

  - The values [APTO_COM_RESTRICAO] on the enum `ResultadoAtestado` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `diasAfastamento` on the `Atestado` table. All the data in the column will be lost.
  - You are about to drop the column `dataExame` on the `Exame` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `Funcionario` table. All the data in the column will be lost.
  - You are about to drop the `Exame_RiscoOcupacional` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `dataRealizacao` to the `Exame` table without a default value. This is not possible if the table is not empty.
  - Made the column `resultado` on table `Exame` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `Funcionario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `Medico` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Medico` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ResultadoAtestado_new" AS ENUM ('APTO', 'INAPTO');
ALTER TABLE "Exame" ALTER COLUMN "resultado" TYPE "ResultadoAtestado_new" USING ("resultado"::text::"ResultadoAtestado_new");
ALTER TYPE "ResultadoAtestado" RENAME TO "ResultadoAtestado_old";
ALTER TYPE "ResultadoAtestado_new" RENAME TO "ResultadoAtestado";
DROP TYPE "ResultadoAtestado_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Atestado" DROP CONSTRAINT "Atestado_exameId_fkey";

-- DropForeignKey
ALTER TABLE "Exame" DROP CONSTRAINT "Exame_funcionarioId_fkey";

-- DropForeignKey
ALTER TABLE "Exame_RiscoOcupacional" DROP CONSTRAINT "Exame_RiscoOcupacional_exameId_fkey";

-- DropForeignKey
ALTER TABLE "Exame_RiscoOcupacional" DROP CONSTRAINT "Exame_RiscoOcupacional_riscoOcupacionalId_fkey";

-- DropForeignKey
ALTER TABLE "Funcionario" DROP CONSTRAINT "Funcionario_empresaId_fkey";

-- AlterTable
ALTER TABLE "Atestado" DROP COLUMN "diasAfastamento",
ALTER COLUMN "data" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "nome" SET DATA TYPE TEXT,
ALTER COLUMN "cnpj" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "telefone" SET NOT NULL,
ALTER COLUMN "telefone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Exame" DROP COLUMN "dataExame",
ADD COLUMN     "dataRealizacao" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "resultado" SET NOT NULL;

-- AlterTable
ALTER TABLE "Funcionario" DROP COLUMN "dataNascimento",
ALTER COLUMN "nome" SET DATA TYPE TEXT,
ALTER COLUMN "cpf" SET DATA TYPE TEXT,
ALTER COLUMN "telefone" SET NOT NULL,
ALTER COLUMN "telefone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Medico" ALTER COLUMN "nome" SET DATA TYPE TEXT,
ALTER COLUMN "crm" SET DATA TYPE TEXT,
ALTER COLUMN "telefone" SET NOT NULL,
ALTER COLUMN "telefone" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "RiscoOcupacional" ALTER COLUMN "nome" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Exame_RiscoOcupacional";

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atestado" ADD CONSTRAINT "Atestado_exameId_fkey" FOREIGN KEY ("exameId") REFERENCES "Exame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
