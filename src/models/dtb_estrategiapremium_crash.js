const { Model, DataTypes } = require('sequelize');

class dtb_estrategiapremium_crash extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      nome:DataTypes.STRING,
      sair:DataTypes.INTEGER,
      aguardar:DataTypes.INTEGER,
      notificar:DataTypes.INTEGER,
      lista:DataTypes.INTEGER,
      sair_em:DataTypes.INTEGER,
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.dtb_tipojogo,{ foreignKey: 'bot_id', as:'usuario' })
  
    }
 

}

module.exports = dtb_estrategiapremium_crash;

