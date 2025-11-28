const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O título é obrigatório.',
      },
    },
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'realizando', 'concluída'),
    allowNull: false,
    defaultValue: 'pendente',
    validate: {
      isIn: {
        args: [['pendente', 'realizando', 'concluída']],
        msg: 'Status inválido. Use: pendente, realizando ou concluída.',
      },
    },
  },
  data_vencimento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  // Opções do modelo
  tableName: 'tasks', // Nome explícito da tabela
  timestamps: true,   // Adiciona createdAt e updatedAt
});

module.exports = Task;