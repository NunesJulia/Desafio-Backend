const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');

// Carrega as variáveis de ambiente
dotenv.config({ path: './.env' });

const app = express();

// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// Habilita o CORS
app.use(cors());

// Monta as rotas de tarefas sob o prefixo /tarefas
app.use('/tarefas', taskRoutes);

const PORT = process.env.PORT || 3000;

// Sincroniza o Sequelize com o banco de dados e inicia o servidor
sequelize.sync() // { force: true } para recriar as tabelas a cada inicialização (cuidado em produção)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Não foi possível sincronizar com o banco de dados:', err);
  });