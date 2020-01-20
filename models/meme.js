module.exports = function (sequelize, DataTypes) {
  const Meme = sequelize.define('Meme', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: DataTypes.STRING,
    fileName: DataTypes.TEXT,
    downloadURL: DataTypes.STRING
  });
  return Meme;
};
