
const { Model, DataTypes } = require('sequelize');

class dtb_mensagem_miner extends Model {
  static init(sequelize) {
    super.init({
      bot_id:DataTypes.INTEGER,
      atencao:DataTypes.TEXT,
      confirmacao:DataTypes.TEXT,
      parcial:DataTypes.TEXT,
      final:DataTypes.TEXT,
      padrao_entrada:DataTypes.INTEGER,
      padrao_nao_entrada:DataTypes.INTEGER,
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
    this.belongsTo(models.dtb_bots,{ foreignKey: 'bot_id', as:'usuario' })
  
    }
 

}

module.exports = dtb_mensagem_miner;



