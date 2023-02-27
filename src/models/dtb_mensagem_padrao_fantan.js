
const { Model, DataTypes } = require('sequelize');

class dtb_mensagem_padrao_fantan extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      atencao:DataTypes.TEXT,
      cofirmacao:DataTypes.TEXT,
      win:DataTypes.TEXT,
      loss:DataTypes.TEXT,
      martingale:DataTypes.TEXT,
      branco:DataTypes.TEXT,
      parcial:DataTypes.TEXT,
      final:DataTypes.TEXT,
      statusmensagem:DataTypes.INTEGER,
      statusmartingale:DataTypes.INTEGER,
      statusparcialfinal:DataTypes.INTEGER,
      statuscoberturabranco:DataTypes.INTEGER,

      
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
    this.belongsTo(models.dtb_bots,{ foreignKey: 'bot_id', as:'usuario' })
  
    }
 

}

module.exports = dtb_mensagem_padrao_fantan;



