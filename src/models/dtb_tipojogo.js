
const { Model, DataTypes } = require('sequelize');

class dtb_tipojogo extends Model {
  static init(sequelize) {
    super.init({
      nome:DataTypes.STRING,
      coleta_dados:DataTypes.INTEGER,
      nome_tabela:DataTypes.STRING,
      caminho_robo:DataTypes.STRING,
      link_acesso:DataTypes.STRING,
      tipo_jogo:DataTypes.STRING,
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
 
    }
 

}

module.exports = dtb_tipojogo;


