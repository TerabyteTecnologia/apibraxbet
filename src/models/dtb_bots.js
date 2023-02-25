
const { Model, DataTypes } = require('sequelize');

class dtb_bots extends Model {
  static init(sequelize) {
    super.init({
      usuario_id:DataTypes.INTEGER,
      tipojogo_id:DataTypes.INTEGER,
      nome:DataTypes.STRING,
      bot_token:DataTypes.STRING,
      iv_bot_token:DataTypes.STRING,
      chat_id:DataTypes.STRING,
      chat_id_free:DataTypes.STRING,
      iv_chat_id:DataTypes.STRING,
      iv_chat_id_free:DataTypes.STRING,
      status:DataTypes.STRING,
      win:DataTypes.INTEGER,
      loss:DataTypes.INTEGER,
      free:DataTypes.STRING,
      total_premium:DataTypes.INTEGER,
      tipo_jogo:DataTypes.STRING,
    }, {
      sequelize
    });
  };


  static associate(models){
    this.belongsTo(models.usuarios,{ foreignKey: 'usuario_id', as:'usuario' })
    this.belongsTo(models.dtb_tipojogo,{ foreignKey: 'tipojogo_id', as:'tipojogo' })
    // this.hasMany(models.dtb_estrategia_crash,{ foreignKey: 'bot_id', as:'estrategiascrash' });
    // this.hasMany(models.dtb_estrategia_double,{ foreignKey: 'bot_id', as:'estrategiasdouble' });
    this.hasMany(models.dtb_mensagem_crash,{ foreignKey: 'bot_id', as:'mensagenscrash' });
    this.hasMany(models.dtb_mensagem_premium,{ foreignKey: 'bot_id', as:'mensagenspremium' });
    // this.hasMany(models.dtb_estrategiapremium_crash,{ foreignKey: 'bot_id', as:'estrategiacrashpremium' });
    // this.hasMany(models.dtb_estrategiapremium_double,{ foreignKey: 'bot_id', as:'estrategiadoublepremium' });
    this.hasMany(models.dtb_mensagem_double,{ foreignKey: 'bot_id', as:'mensagensdouble' });
    // this.hasMany(models.dtb_estrategia_bet365,{ foreignKey: 'bot_id', as:'estrategiasbet' });
    this.hasMany(models.dtb_mensagem_bet365,{ foreignKey: 'bot_id', as:'mensagensroleta' }); 
    // this.hasMany(models.dtb_estrategia_fantan,{ foreignKey: 'bot_id', as:'estrategiasfantan' });
    this.hasMany(models.dtb_mensagem_fantan,{ foreignKey: 'bot_id', as:'mensagensfantan' });
    // this.hasMany(models.dtb_estrategia_futballstudio,{ foreignKey: 'bot_id', as:'estrategiasfutballstudio' });
    this.hasMany(models.dtb_mensagem_futballstudio,{ foreignKey: 'bot_id', as:'mensagensfutballstudio' });
    // this.hasMany(models.dtb_estrategia_penalty,{ foreignKey: 'bot_id', as:'estrategiapenalty' });
    this.hasMany(models.dtb_mensagem_penalty,{ foreignKey: 'bot_id', as:'mensagenspenalty' });
    // this.hasMany(models.dtb_estrategia_aviator,{ foreignKey: 'bot_id', as:'estrategiasaviator' });
    this.hasMany(models.dtb_mensagem_aviator,{ foreignKey: 'bot_id', as:'mensagensaviator' });
    // this.hasMany(models.dtb_estrategia_miner,{ foreignKey: 'bot_id', as:'estrategiasminers' });
    this.hasMany(models.dtb_mensagem_miner,{ foreignKey: 'bot_id', as:'mensagensminer' });
  }


}

module.exports = dtb_bots;



