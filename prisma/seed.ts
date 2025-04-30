import { PrismaClient, StatusFuncionario, TipoExame, ResultadoAtestado, Empresa, Funcionario, Exame, Medico, Atestado } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();
const BATCH_SIZE = 500;

async function insertInBatches<T>(data: T[], model: any) {
  for (let i = 0; i < data.length; i += BATCH_SIZE) {
    const batch = data.slice(i, i + BATCH_SIZE);
    await model.createMany({
      data: batch,
      skipDuplicates: true,
    });
    console.log(`Inseridos ${i + batch.length} de ${data.length} registros.`);
  }
}

async function main() {
  // Parâmetros ajustados para uma situação mais realista:
  const totalEmpresas = 80000;  // 80.000 empresas
  const minFuncionariosPorEmpresa = 50;  // Mínimo de 50 funcionários por empresa
  const maxFuncionariosPorEmpresa = 200; // Máximo de 200 funcionários por empresa
  const examesPorFuncionarioMin = 2;     // Mínimo de 2 exames por funcionário
  const examesPorFuncionarioMax = 5;     // Máximo de 5 exames por funcionário
  const totalMedicos = 1000;  // 1.000 médicos

  // Array para armazenar os IDs das empresas inseridas
  const empresasIds: string[] = [];

  // Inserir empresas em batches para evitar acúmulo em memória
  console.log("Inserindo empresas...");
  for (let i = 0; i < totalEmpresas; i += BATCH_SIZE) {
    const companiesBatch: Empresa[] = [];
    const upperLimit = Math.min(i + BATCH_SIZE, totalEmpresas);
    for (let j = i; j < upperLimit; j++) {
      const id = randomUUID();
      companiesBatch.push({
        id,
        nome: `Empresa ${j + 1}`,
        cnpj: `00.000.000/0000-${j + 1}`,
        telefone: `+55 11 99999-000${j + 1}`,
        email: `empresa${j + 1}@email.com`,
        createdAt: new Date(),
      });
      empresasIds.push(id);
    }
    await prisma.empresa.createMany({ data: companiesBatch, skipDuplicates: true });
    console.log(`Inseridas ${upperLimit} de ${totalEmpresas} empresas.`);
  }

  // Inserir médicos (totalMedicos = 1000)
  console.log("Inserindo médicos...");
  const medicosData: Medico[] = [];
  for (let i = 0; i < totalMedicos; i++) {
    medicosData.push({
      id: randomUUID(),
      nome: `Medico ${i + 1}`,
      crm: `CRM-${i + 1}`,
      telefone: `+55 11 97777-000${i + 1}`,
      email: `medico${i + 1}@email.com`,
      createdAt: new Date(),
    });
  }
  await insertInBatches(medicosData, prisma.medico);
  const medicosIds = medicosData.map(m => m.id);

  // Para cada empresa, inserir múltiplos funcionários, exames e atestados
  console.log("Inserindo funcionários, exames e atestados para cada empresa...");
  for (let i = 0; i < empresasIds.length; i++) {
    const empresaId = empresasIds[i];
    const numFuncionarios = Math.floor(Math.random() * (maxFuncionariosPorEmpresa - minFuncionariosPorEmpresa + 1)) + minFuncionariosPorEmpresa;

    // Inserir funcionários para a empresa
    const funcionariosData: Funcionario[] = [];
    for (let j = 0; j < numFuncionarios; j++) {
      const funcionarioId = randomUUID();
      funcionariosData.push({
        id: funcionarioId,
        nome: `Funcionario Empresa ${i + 1} - ${j + 1}`,
        cpf: `123.456.789-${i + 1}-${j + 1}`, // Agora único para cada funcionário
        telefone: `+55 11 98888-000${i + 1}-${j + 1}`,
        status: Math.random() > 0.5 ? StatusFuncionario.ATIVO : StatusFuncionario.AFASTADO,
        empresaId: empresaId,
        createdAt: new Date(),
      });
    }

    // Inserir funcionários em batches
    await insertInBatches(funcionariosData, prisma.funcionario);

    // Para cada funcionário, inserir exames e atestados
    for (const funcionario of funcionariosData) {
      const numExames = Math.floor(Math.random() * (examesPorFuncionarioMax - examesPorFuncionarioMin + 1)) + examesPorFuncionarioMin;
      const examesData: Exame[] = [];

      for (let k = 0; k < numExames; k++) {
        const exameId = randomUUID();
        const tipoExame = (Object.values(TipoExame) as TipoExame[])[Math.floor(Math.random() * Object.values(TipoExame).length)];
        const medicoId = medicosIds[Math.floor(Math.random() * medicosIds.length)];
        const resultado = Math.random() > 0.2 ? ResultadoAtestado.APTO : ResultadoAtestado.INAPTO;
        
        examesData.push({
          id: exameId,
          tipo: tipoExame,
          dataRealizacao: new Date(),
          funcionarioId: funcionario.id,
          medicoId: medicoId,
          resultado: resultado,
          createdAt: new Date(),
        });
      }

      // Inserir exames em batches
      await insertInBatches(examesData, prisma.exame);

      // Para cada exame, inserir atestado com arquivo de ~13KB
      const atestadosData: Atestado[] = examesData.map(exame => ({
        id: randomUUID(),
        descricao: `Atestado para o exame ${exame.id}`,
        data: new Date(),
        exameId: exame.id,
        arquivo: Buffer.from("A".repeat(1024 * 13)),
      }));

      // Inserir atestados
      await insertInBatches(atestadosData, prisma.atestado);
    }

    if ((i + 1) % 1000 === 0) {
      console.log(`Processadas ${i + 1} de ${empresasIds.length} empresas.`);
    }
  }

  console.log("Seed concluído com sucesso!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
