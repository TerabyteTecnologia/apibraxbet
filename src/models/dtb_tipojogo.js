
const { Model, DataTypes } = require('sequelize');

class dtb_tipojogo extends Model {
  static init(sequelize) {
    super.init({
      nome:DataTypes.STRING,
      descricao:DataTypes.STRING,
      win:DataTypes.INTEGER,
      loss:DataTypes.INTEGER,
      caminho_robo_adm:DataTypes.STRING,
      caminho_robo:DataTypes.STRING,
      status_robo_adm:DataTypes.STRING,
      link_acesso:DataTypes.STRING,
   
    }, {
      sequelize
    });
  };


  static associate(models){
     this.hasMany(models.dtb_bots,{ foreignKey: 'tipojogo_id', as:'boots' });
     this.hasMany(models.dtb_estrategia_crash,{ foreignKey: 'bot_id', as:'estrategiascrash' });
     this.hasMany(models.dtb_estrategia_double,{ foreignKey: 'bot_id', as:'estrategiasdouble' });
     this.hasMany(models.dtb_estrategiapremium_crash,{ foreignKey: 'bot_id', as:'estrategiacrashpremium' });
     this.hasMany(models.dtb_estrategiapremium_double,{ foreignKey: 'bot_id', as:'estrategiadoublepremium' });
     this.hasMany(models.dtb_estrategia_bet365,{ foreignKey: 'bot_id', as:'estrategiasbet' });
     this.hasMany(models.dtb_estrategia_fantan,{ foreignKey: 'bot_id', as:'estrategiasfantan' });
     this.hasMany(models.dtb_estrategia_futballstudio,{ foreignKey: 'bot_id', as:'estrategiasfutballstudio' });
     this.hasMany(models.dtb_estrategia_penalty,{ foreignKey: 'bot_id', as:'estrategiapenalty' });
     this.hasMany(models.dtb_estrategia_aviator,{ foreignKey: 'bot_id', as:'estrategiasaviator' });
     this.hasMany(models.dtb_estrategia_miner,{ foreignKey: 'bot_id', as:'estrategiasminers' });
     this.hasMany(models.dtb_estrategia_furtunetiger,{ foreignKey: 'bot_id', as:'estrategiasfurtunetiger' });
     this.hasMany(models.dtb_mensagem_padrao_fantan,{ foreignKey: 'bot_id', as:'mensagensfantan' });
     this.hasMany(models.dtb_mensagem_padrao_aviator,{ foreignKey: 'bot_id', as:'mensagensaviator' });
     this.hasMany(models.dtb_mensagem_padrao_miner,{ foreignKey: 'bot_id', as:'mensagensminer' });
     this.hasMany(models.dtb_mensagem_padrao_futballstudio,{ foreignKey: 'bot_id', as:'mensagensfootballstudio'});
     this.hasMany(models.dtb_mensagem_padrao_penalty,{ foreignKey: 'bot_id', as:'mensagenspenalty'});
     this.hasMany(models.dtb_mensagem_padrao_premium,{ foreignKey: 'bot_id', as:'mensagenspremium'});
     this.hasMany(models.dtb_mensagem_padrao_furtunetiger,{ foreignKey: 'bot_id', as:'mensagensfurtunetiger'});

 
    }
 

}

module.exports = dtb_tipojogo;


