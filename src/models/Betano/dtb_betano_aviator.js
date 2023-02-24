const { Model, DataTypes } = require('sequelize');

class dtb_betano_aviator extends Model {
  static init(sequelize) {
    super.init({
        seed:DataTypes.STRING,
        crash_point:DataTypes.FLOAT,
       
    
    }, {
      sequelize
    });
  };

 

}

module.exports = dtb_betano_aviator;
