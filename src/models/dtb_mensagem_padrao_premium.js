
const { Model, DataTypes } = require('sequelize');

class dtb_mensagem_padrao_premium extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      abertura:DataTypes.TEXT,
      fechamento:DataTypes.TEXT,
      atencao:DataTypes.TEXT,
      win:DataTypes.TEXT,
      loss:DataTypes.TEXT,
      parcial:DataTypes.TEXT,
      final:DataTypes.TEXT,
      statusparcialfinal:DataTypes.INTEGER,
      //padrao
      tipomensagem:DataTypes.INTEGER,
      manhainicio:DataTypes.STRING,
      manhafim:DataTypes.STRING,
      tardeinicio:DataTypes.STRING,
      tardefim:DataTypes.STRING,
      noiteinicio:DataTypes.STRING,
      noiteifim:DataTypes.STRING,
      statusmanha:DataTypes.INTEGER,
      statustarde:DataTypes.INTEGER,
      statusnoite:DataTypes.INTEGER,
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.dtb_tipojogo,{ foreignKey: 'bot_id', as:'usuario' })
  
    }
 

}

module.exports = dtb_mensagem_padrao_premium;



