module.exports = function(sequelize, DataTypes) {
	var Audio = sequelize.define('audios', {
    estado: DataTypes.STRING
	});
  return Audio;
};
