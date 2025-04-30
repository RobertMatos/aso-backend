# Usa uma imagem do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante dos arquivos para o container
COPY . .

# Expõe a porta usada pela API Nest.js
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "start:dev"]
