require('dotenv').config();
module.exports ={
    dialect: 'mysql',
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    define:{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', 
        timestamps:true,
        underscored:true,
        freezeTableName: true,
        
    },

};
