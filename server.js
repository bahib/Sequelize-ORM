const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

// Configuration de la connexion à la base de données
const connection = new Sequelize('sequelize', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false, // Désactiver les logs SQL pour plus de propreté
});

// Définition du modèle User
const User = connection.define('User', {
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Assurez-vous que ce champ est obligatoire
  },
  bio: {
    type: DataTypes.TEXT,
  },
});

// Synchronisation et démarrage du serveur
connection
  .sync({ force: true }) // Supprime et recrée les tables
  .then(() => {
    console.log('🚀 Database connected successfully.');
    app.listen(3001, () => {
      console.log('✅ Server is running on http://localhost:3001');
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database. Please check your configuration:');
    console.error(`- Error Code: ${err.code}`);
    console.error(`- SQL State: ${err.sqlState}`);
    console.error(`- Error Message: ${err.message}`);
    process.exit(1); // Arrête l'application en cas d'erreur critique
  });
