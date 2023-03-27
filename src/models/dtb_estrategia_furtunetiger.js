
const { Model, DataTypes } = require('sequelize');

class dtb_estrategia_furtunetiger extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      espera:DataTypes.INTEGER,
      minimo:DataTypes.INTEGER,
      maximo:DataTypes.INTEGER,

    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.dtb_tipojogo,{ foreignKey: 'bot_id', as:'usuario' })
  
    }
 

}

module.exports = dtb_estrategia_furtunetiger;
