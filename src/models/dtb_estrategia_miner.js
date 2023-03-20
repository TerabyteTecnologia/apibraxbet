
const { Model, DataTypes } = require('sequelize');

class dtb_estrategia_miner extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      espera:DataTypes.INTEGER,
      tentativas:DataTypes.INTEGER,
      minas_a:DataTypes.INTEGER,
      minas_b:DataTypes.INTEGER,
      entrada_a:DataTypes.INTEGER,
      entrada_b:DataTypes.INTEGER,
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

module.exports = dtb_estrategia_miner;
