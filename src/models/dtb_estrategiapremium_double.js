const { Model, DataTypes } = require('sequelize');

class dtb_estrategiapremium_double extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      nome:DataTypes.STRING,
      aguardar:DataTypes.INTEGER,
      intervalo:DataTypes.INTEGER,
      lista:DataTypes.INTEGER,
   
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.dtb_tipojogo,{ foreignKey: 'bot_id', as:'usuario' })
  
    }
 

}

module.exports = dtb_estrategiapremium_double;

