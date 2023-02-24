const Sequelize = require('sequelize');
const dbConfigbetano = require('../config/databasebetano');
const dbConfigestrelabet = require('../config/databaseestrelabet');
const dbConfigeumwin = require('../config/databaseonewin');

const dtb_betano_aviator = require('../models/Betano/dtb_betano_aviator');
const dtb_umwin_aviator = require('../models/Betano/dtb_umwin_aviator');
const dtb_estrelabet_aviator = require('../models/Betano/dtb_estrelabet_aviator');


const connection = new Sequelize(dbConfigbetano);
const connectionEstrela = new Sequelize(dbConfigestrelabet);
const connectionumwin = new Sequelize(dbConfigeumwin);



dtb_betano_aviator.init(connection);
dtb_umwin_aviator.init(connectionumwin);
dtb_estrelabet_aviator.init(connectionEstrela);




