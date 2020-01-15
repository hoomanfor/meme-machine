module.exports = function (sequelize, DataTypes) {
  const Meme = sequelize.define('Meme', {
    userId: DataTypes.STRING,
    fileName: DataTypes.TEXT,
    downloadURL: DataTypes.STRING
  });
  return Meme;
};
