
const { Model, DataTypes } = require('sequelize');

class dtb_estrategia_aviator extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      nome:DataTypes.STRING,
      sequencia:DataTypes.STRING,
      apostar_em:DataTypes.STRING,
      martingale:DataTypes.INTEGER,
      status:DataTypes.STRING,
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

module.exports = dtb_estrategia_aviator;
