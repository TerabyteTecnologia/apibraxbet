const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Usuarios = require('../models/Usuarios');
const Permissoes = require('../models/Permissoes');
const Rotas = require('../models/Rotas');
const dtb_bots = require('../models/dtb_bots');
const dtb_tipojogo = require('../models/dtb_tipojogo');
const dtb_estrategia_crash = require('../models/dtb_estrategia_crash');
const dtb_estrategiapremium_crash = require('../models/dtb_estrategiapremium_crash');
const dtb_estrategiapremium_double = require('../models/dtb_estrategiapremium_double');
const dtb_estrategia_double = require('../models/dtb_estrategia_double');
const dtb_estrategia_fantan = require('../models/dtb_estrategia_fantan');
const dtb_estrategia_futballstudio = require('../models/dtb_estrategia_futballstudio');
const dtb_estrategia_penalty = require('../models/dtb_estrategia_penalty');
const dtb_estrategia_aviator = require('../models/dtb_estrategia_aviator');
const dtb_mensagem_crash = require('../models/dtb_mensagem_crash');
const dtb_mensagem_premium = require('../models/dtb_mensagem_premium');
const dtb_mensagem_double = require('../models/dtb_mensagem_double');
const dtb_mensagem_fantan = require('../models/dtb_mensagem_fantan');
const dtb_mensagem_futballstudio = require('../models/dtb_mensagem_futballstudio');
const dtb_mensagem_penalty = require('../models/dtb_mensagem_penalty');
const dtb_mensagem_aviator = require('../models/dtb_mensagem_aviator');

//miner
const dtb_estrategia_miner = require('../models/dtb_estrategia_miner');
const dtb_mensagem_miner = require('../models/dtb_mensagem_miner');

const dtb_estrategia_bet365 = require('../models/dtb_estrategia_bet365');
const dtb_mensagem_bet365 = require('../models/dtb_mensagem_bet365');

//#### PAdrao
const dtb_mensagem_padrao_fantan = require('../models/dtb_mensagem_padrao_fantan');
const dtb_mensagem_padrao_aviator = require('../models/dtb_mensagem_padrao_aviator');
const dtb_mensagem_padrao_miner = require('../models/dtb_mensagem_padrao_miner');
const dtb_mensagem_padrao_futballstudio = require('../models/dtb_mensagem_padrao_futballstudio');
const dtb_mensagem_padrao_penalty = require('../models/dtb_mensagem_padrao_penalty');



const connection = new Sequelize(dbConfig);


Usuarios.init(connection);
Permissoes.init(connection);
Rotas.init(connection);
dtb_tipojogo.init(connection);
dtb_bots.init(connection);
dtb_estrategia_crash.init(connection);
dtb_estrategiapremium_crash.init(connection);
dtb_estrategiapremium_double.init(connection);
dtb_estrategia_double.init(connection);
dtb_estrategia_fantan.init(connection);
dtb_estrategia_futballstudio.init(connection);
dtb_mensagem_crash.init(connection);
dtb_mensagem_double.init(connection);
dtb_mensagem_fantan.init(connection);
dtb_mensagem_premium.init(connection);
dtb_estrategia_bet365.init(connection);
dtb_mensagem_bet365.init(connection);
dtb_mensagem_futballstudio.init(connection);
dtb_estrategia_penalty.init(connection);
dtb_mensagem_penalty.init(connection);
dtb_estrategia_aviator.init(connection);
dtb_mensagem_aviator.init(connection);
dtb_estrategia_miner.init(connection);
dtb_mensagem_miner.init(connection);
dtb_mensagem_padrao_fantan.init(connection);
dtb_mensagem_padrao_aviator.init(connection);
dtb_mensagem_padrao_miner.init(connection);
dtb_mensagem_padrao_futballstudio.init(connection);
dtb_mensagem_padrao_penalty.init(connection);







//associate


Usuarios.associate(connection.models);
Permissoes.associate(connection.models);
Rotas.associate(connection.models);
dtb_tipojogo.associate(connection.models);
dtb_bots.associate(connection.models);
dtb_estrategia_crash.associate(connection.models);
dtb_estrategiapremium_crash.associate(connection.models);
dtb_estrategiapremium_double.associate(connection.models);
dtb_estrategia_double.associate(connection.models);
dtb_estrategia_fantan.associate(connection.models);
dtb_mensagem_crash.associate(connection.models);
dtb_mensagem_double.associate(connection.models);
dtb_mensagem_fantan.associate(connection.models);
dtb_estrategia_bet365.associate(connection.models);
dtb_mensagem_bet365.associate(connection.models);
dtb_mensagem_premium.associate(connection.models);
dtb_mensagem_futballstudio.associate(connection.models);
dtb_estrategia_penalty.associate(connection.models);
dtb_mensagem_penalty.associate(connection.models);
dtb_estrategia_aviator.associate(connection.models);
dtb_mensagem_aviator.associate(connection.models);
dtb_estrategia_miner.associate(connection.models);
dtb_mensagem_miner.associate(connection.models);
dtb_mensagem_padrao_fantan.associate(connection.models);
dtb_mensagem_padrao_aviator.associate(connection.models);
dtb_mensagem_padrao_miner.associate(connection.models);
dtb_mensagem_padrao_futballstudio.associate(connection.models);
dtb_mensagem_padrao_penalty.associate(connection.models);