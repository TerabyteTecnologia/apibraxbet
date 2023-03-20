
const { Model, DataTypes } = require('sequelize');

class dtb_estrategia_penalty extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      esperar:DataTypes.FLOAT,
      tentativa:DataTypes.INTEGER,
      win:DataTypes.INTEGER,
      loss:DataTypes.INTEGER,
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.dtb_tipojogo,{ foreignKey: 'bot_id', as:'usuario' })
  
    }
 

}

module.exports = dtb_estrategia_penalty;

