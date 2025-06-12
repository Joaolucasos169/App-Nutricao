

---

## 🚀 **Passo a Passo de Instalação com Comandos**

### **1. Backend: Node.js + MongoDB + JWT + Express**

#### 1.1 **Criando e Configurando o Backend**

1. **Criar diretório do backend**:

   ```bash
   mkdir backend
   cd backend
   ```

2. **Inicializar o projeto Node.js**:

   ```bash
   npm init -y
   ```

3. **Instalar dependências necessárias**:

   ```bash
   npm install express mongoose dotenv cors bcryptjs jsonwebtoken nodemailer
   ```

4. **Instalar dependências para desenvolvimento (nodemon)**:

   ```bash
   npm install --save-dev nodemon
   ```

5. **Estrutura de Diretórios**:
   Agora, crie a estrutura de pastas para seu projeto backend:

   ```bash
   mkdir src
   cd src
   mkdir controllers middlewares models routes
   ```

6. **Criar o arquivo principal `app.js`**:
   No diretório `src`, crie o arquivo `app.js`:

   ```bash
   touch app.js
   ```

7. **Criar o arquivo de servidor `server.js`**:
   No diretório `src`, crie o arquivo `server.js`:

   ```bash
   touch server.js
   ```

---

#### 1.2 **Configurar o `.env`**

1. **Criar o arquivo `.env` na raiz do backend**:
   Este arquivo conterá as variáveis de ambiente (como o MongoDB URI e a chave secreta JWT).

   No diretório raiz do seu projeto, crie o arquivo `.env`:

   ```bash
   touch .env
   ```

2. **Adicionar variáveis de ambiente** no arquivo `.env`:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/nome_do_banco
   JWT_SECRET=sua_chave_secreta
   ```

   * **MONGO\_URI**: A URL de conexão com o MongoDB (se for usar o MongoDB Atlas, pegue a URL de lá).
   * **JWT\_SECRET**: A chave secreta para assinar os tokens JWT.

---

#### 1.3 **Configuração Inicial do `app.js`**

No arquivo `src/app.js`, você pode iniciar a configuração do Express e das rotas:

```js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

module.exports = app;
```

---

#### 1.4 **Configuração do `server.js`**

No arquivo `src/server.js`, configure o servidor para rodar:

```js
const app = require('./app');

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

---

#### 1.5 **Rodar o Backend com Nodemon**

1. **No arquivo `package.json`**, adicione o script para rodar o backend com **nodemon**:

   ```json
   "scripts": {
     "dev": "nodemon src/server.js"
   }
   ```

2. **Rodar o backend**:

   ```bash
   npm run dev
   ```

O servidor agora estará rodando na porta `3333`.

---

### **2. Frontend: React Native com Expo Go**

#### 2.1 **Criar o diretório e inicializar o projeto com Expo**

1. **Criar o diretório do frontend**:

   ```bash
   mkdir frontend
   cd frontend
   ```

2. **Inicializar o projeto React Native com Expo**:

   ```bash
   expo init .
   ```

   Escolha um template como **blank**.

#### 2.2 **Instalar Dependências Necessárias**

Instale as dependências que você usará no frontend:

```bash
npm install axios react-navigation react-navigation-stack react-navigation-tabs @react-native-async-storage/async-storage
```

Além disso, para garantir que as dependências de navegação funcionem corretamente, instale as dependências específicas do Expo para navegação:

```bash
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
```

---

#### 2.3 **Rodar o Frontend no Expo Go**

1. **Rodar o aplicativo**:

   ```bash
   npm start
   ```

2. **Escanear o QR code** com o **Expo Go** no seu dispositivo para rodar o app. Caso queira rodar no emulador, use:

   * Para Android:

     ```bash
     expo start --android
     ```
   * Para iOS:

     ```bash
     expo start --ios
     ```

---

### **3. Comandos de Teste da API (Postman/Insomnia)**

#### 3.1 **Testar o Endpoint de Registro de Usuário**

1. **Método**: `POST`
2. **URL**: `http://localhost:3333/auth/register`
3. **Body (JSON)**:

   ```json
   {
     "name": "João",
     "email": "joao@dominio.com",
     "password": "senha123"
   }
   ```

#### 3.2 **Testar o Endpoint de Login**

1. **Método**: `POST`
2. **URL**: `http://localhost:3333/auth/login`
3. **Body (JSON)**:

   ```json
   {
     "email": "joao@dominio.com",
     "password": "senha123"
   }
   ```

   **Resposta (JSON)**:

   ```json
   {
     "user": {
       "_id": "id_do_usuario",
       "name": "João",
       "email": "joao@dominio.com",
       "role": "user"
     },
     "token": "seu_token_jwt_aqui"
   }
   ```

#### 3.3 **Testar o Endpoint de Listagem de Usuários (com Busca e Paginação)**

1. **Método**: `GET`
2. **URL**: `http://localhost:3333/users?search=João&page=1&limit=10`
3. **Cabeçalho (Authorization)**:

   * `Authorization: Bearer seu_token_jwt_aqui`

   **Resposta (JSON)**:

   ```json
   {
     "users": [
       {
         "_id": "id_do_usuario",
         "name": "João",
         "email": "joao@dominio.com"
       },
       ...
     ],
     "total": 50
   }
   ```

---

### **4. Outras Considerações Importantes**

* **Configurar o MongoDB Atlas** (caso utilize a versão na nuvem):

  * Crie um cluster em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  * Conecte-se ao cluster e gere a URL de conexão, colocando no `.env`.

* **Testar Localmente**:

  * Use o Postman ou Insomnia para testar as APIs enquanto desenvolve o backend.
  * Verifique as respostas dos endpoints e ajuste o frontend conforme necessário.

---

## 🧑‍💻 **Comandos Resumidos**

### **Backend**

1. **Criar o diretório e inicializar o Node.js**:

   ```bash
   mkdir backend
   cd backend
   npm init -y
   npm install express mongoose dotenv cors bcryptjs jsonwebtoken nodemailer
   npm install --save-dev nodemon
   ```

2. **Rodar o servidor com Nodemon**:

   ```bash
   npm run dev
   ```

### **Frontend**

1. **Criar o diretório e inicializar o React Native com Expo**:

   ```bash
   mkdir frontend
   cd frontend
   expo init .
   ```

2. **Instalar dependências**:

   ```bash
   npm install axios react-navigation react-navigation-stack react-navigation-tabs @react-native-async-storage/async-storage
   expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
   ```

3. **Rodar o app no Expo Go**:

   ```bash
   npm start
   ```

---


