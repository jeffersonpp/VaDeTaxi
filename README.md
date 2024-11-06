# Va de Taxi API

A API **Va de Taxi** foi desenvolvida para gerenciar passageiros, motoristas e corridas em um sistema de transporte tipo táxi. Com esta API, é possível registrar passageiros, motoristas, criar corridas, atualizar status e realizar operações de exclusão (soft e hard delete).

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para desenvolvimento de APIs em Node.js.
- **Supertest**: Ferramenta para testes de APIs HTTP.
- **AVA**: Framework de testes para garantir a qualidade da API.

## Como Começar

###  1. Clone este repositório

Clone o repositório para o seu computador local:

git clone https://github.com/jeffersonpp/vadetaxi.git

###  2. Instale as dependências
Navegue até o diretório do projeto e instale as dependências com o comando:

cd va-de-taxi-api
npm install

### 3. Configuração do Ambiente
Verifique o arquivo .env na raiz do projeto para configurar variáveis de ambiente, como a porta do servidor.
Adapte conforme necessário para seu ambiente.

### 4. Rodando o Servidor
Para iniciar o servidor, use o comando:
'npm start'
Isso fará com que a API seja iniciada na porta configurada (por padrão, 3000).

### 5. Rodando os Testes
Se você deseja rodar os testes para verificar se tudo está funcionando corretamente, execute o comando:
npm test
Os testes são escritos utilizando o framework AVA e garantem que as principais funcionalidades da API estejam funcionando corretamente.
Pode ser que a ultima linha apresente um erro "Failed to exit when running test.js", infelizmente o nodejs as vezes nao termina corretamente com supertest e ava

### 6. Autor
Jefferson Lopes de Sousa (jeffersonpp@gmail.com)
Grato,
