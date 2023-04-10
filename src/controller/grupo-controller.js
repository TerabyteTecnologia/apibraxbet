'use strict';
require('dotenv').config();
 const Grupo = require('../models/dtb_bots');
 const TipoJogo = require('../models/dtb_tipojogo');


 const MsgDouble = require('../models/dtb_mensagem_double');
 const MsgFantan = require('../models/dtb_mensagem_fantan');
 const MsgFutballStudio = require('../models/dtb_mensagem_futballstudio');
 const MsgAviator = require('../models/dtb_mensagem_aviator');
 const MsgPenalty = require('../models/dtb_mensagem_penalty');
 const MsgCrash = require('../models/dtb_mensagem_crash');
 const MsgPremium = require('../models/dtb_mensagem_premium');
 const MsgRoleta = require('../models/dtb_mensagem_bet365');
 const MsgMiner = require('../models/dtb_mensagem_miner');
 const MsgFurtuneTiger = require('../models/dtb_mensagem_furtunetiger');

 const ValidationContract = require("../validator/fluent-validators");
 const pm2 = require('pm2')
 var shell = require('shelljs');
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");
const { encrypt, decrypt } = require('../services/criptografar-crypto');

 function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
module.exports = {
 
async index(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
           var grupos = new Grupo();
           if(usuarioLogado.permissoes.length > 0){
              grupos = await Grupo.findAll({
                include:[
                    {association:"tipojogo"},
                ]
              })
           }else{
            grupos = await Grupo.findAll(
            {where:{usuario_id:usuarioLogado.id},
                include:[
                    {association:"tipojogo"},
                ]
            },)
           }
          

        return  res.status(200).send({
            grupos:grupos
        });

    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},

async store(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        const {nome,tipojogo_id,bot_token,chat_id,chat_id_free,usuario_id} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(tipojogo_id, 'tipojogo_id', 'O tipo_jogo é obrigatorio');
        contract.isRequired(bot_token, 'bot_token', 'O bot_token é obrigatorio');
        contract.isRequired(chat_id, 'chat_id', 'O chat_id é obrigatorio');
        contract.isRequired(chat_id_free, 'chat_id_free', 'O chat_id é obrigatorio');
        contract.isRequired(usuario_id, 'usuario_id', 'O usuario é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };

     
         const tipoJogo = await TipoJogo.findOne( {where:{id:tipojogo_id},
            include:[
                 {association:"mensagensfantan"},
                 {association:"mensagensaviator"},
                 {association:"mensagensminer"},
                 {association:"mensagensfootballstudio"},
                 {association:"mensagenspenalty"},
                 {association:"mensagenspremium"},
                 {association:"mensagensfurtunetiger"},
                 {association:"mensagensroleta"},
             ]},
     
         );
        if(!tipoJogo){
            return res.status(201).json({
                msg:'Jogo não existe',
            
            })
        }
        const bot_tokenCripto= await encrypt(bot_token);
        const chat_idCripto= await encrypt(chat_id);
        const [iv_bot_token, encripytToken] = bot_tokenCripto.split(':');
        const [iv_chat_id, encript_chatid] = chat_idCripto.split(':');
        
        const chat_idCripto_free= await encrypt(chat_id_free);
        const [iv_chat_id_free, encript_chatid_free] = chat_idCripto_free.split(':');

        const grupo = await Grupo.create({
            nome,
            tipojogo_id:tipojogo_id,
            bot_token:encripytToken,
            chat_id:encript_chatid,
            chat_id_free:encript_chatid_free,
            iv_bot_token:iv_bot_token,
            iv_chat_id:iv_chat_id,
            iv_chat_id_free:iv_chat_id_free,
            usuario_id,
            tipo_jogo:tipoJogo.nome,
        }); 
  
     
        ///Monta as estrategias e mensagem ;;;;; melhorar isso atravazes de utils
        if(tipoJogo.nome.includes('Double')){

            //Mensagem double
            await MsgDouble.create({
                    bot_id: grupo.id,
                    atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 Blaze: <a href="https://blaze.com/pt/games/double">Double</a>',
                    
                    cofirmacao:'🔔 Entrada Confirmada 🔔 \n📍Entrar Após [ULTIMO_NUMERO] [ULTIMA_COR]  \n🎰  Blaze: <a href="https://blaze.com/pt/games/double">Double</a>  \n⚪️ Cobrir o BRANCO  \n💰 Apostar: [ENTRADA]',

                    
                    win:'✅✅✅GREEN - BATEU META? VAZA \n[COR_SEQUENCIA]  \n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
                    
                    loss:'⛔ RED - SEGUE GERENCIAMENTO \n[COR_SEQUENCIA] \n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',

                    martingale:'🔁 [NUMERO]º Martingale!',

                    branco:'🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🤑🤑🤑🤑🤑Green no Branco🤑🤑🤑🤑🤑\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
                    parcial:'🚀Resultado parcial \n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
                    final:'🚀Resultado Final \n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
                
            }); 
        }else if(tipoJogo.nome.includes('Crash')){
           // console.log(tipoJogo)
            tipoJogo.mensagensaviator.map(async res=>{
               
                await MsgAviator.create({
                    bot_id: grupo.id,
                    abertura:res.abertura,
                    fechamento:res.fechamento,
                    atencao:res.atencao,
                    cofirmacao:res.cofirmacao,
                    win:res.win,
                    loss:res.loss,
                    martingale:res.martingale,
                    branco:res.branco,
                    parcial:res.parcial,
                    final:res.final,

                    statusmartingale:res.statusmartingale,
                    statusparcialfinal:res.statusparcialfinal,
                    statuscoberturabranco:res.statusparcialfinal,


                    manhainicio:res.manhainicio,
                    manhafim:res.manhafim,
                    tardeinicio:res.tardeinicio,
                    tardefim:res.tardefim,
                    noiteinicio:res.noiteinicio,
                    noiteifim:res.noiteifim,
                    statusmanha:res.statusmanha,
                    statustarde:res.statustarde,
                    statusnoite:res.statusnoite,

                    tipomensagem:res.tipomensagem,
                });
            })

        }else if(tipoJogo.nome.includes('Mines')){
              
            tipoJogo.mensagensminer.map(async res=>{
                await MsgMiner.create({
                    bot_id:grupo.id,
                    abertura:res.abertura,
                    fechamento:res.fechamento,
                    atencao:res.atencao,
                    confirmacao:res.confirmacao,
                    parcial:res.parcial,
                    final:res.final,
                    
                    padrao_entrada:res.padrao_entrada,
                    padrao_nao_entrada:res.padrao_nao_entrada,
                    statusparcialfinal:res.statusparcialfinal,
                   
                    manhainicio:res.manhainicio,
                    manhafim:res.manhafim,
                    tardeinicio:res.tardeinicio,
                    tardefim:res.tardefim,
                    noiteinicio:res.noiteinicio,
                    noiteifim:res.noiteifim,
                    statusmanha:res.statusmanha,
                    statustarde:res.statustarde,
                    statusnoite:res.statusnoite,


                    tipomensagem:res.tipomensagem,
                }); 
               
            })
          
        }else if(tipoJogo.nome.includes('Slot')){
              
            tipoJogo.mensagensfurtunetiger.map(async res=>{
                await MsgFurtuneTiger.create({
                    bot_id:grupo.id,
                    abertura:res.abertura,
                    fechamento:res.fechamento,
                    atencao:res.atencao,
                    confirmacao:res.confirmacao,
                    final:res.final,
                    statusgreen:res.statusgreen,
                    tipomensagem:res.tipomensagem,
                    manhainicio:res.manhainicio,
                    manhafim:res.manhafim,
                    tardeinicio:res.tardeinicio,
                    tardefim:res.tardefim,
                    noiteinicio:res.noiteinicio,
                    noiteifim:res.noiteifim,
                    statusmanha:res.statusmanha,
                    statustarde:res.statustarde,
                    statusnoite:res.statusnoite,
                }); 
               
            })
          
        }else if(tipoJogo.nome.includes('Fantan')){
           
            tipoJogo.mensagensfantan.map(async res=>{

                await MsgFantan.create({
                    bot_id: grupo.id,
                    abertura:res.abertura,
                    fechamento:res.fechamento,
                    atencao: res.atencao,
                    
                    cofirmacao:res.cofirmacao,
    
                    
                    win:res.win,
                    
                    loss:res.loss,
    
                    martingale:res.martingale,
    
                    branco:res.branco,
                    parcial:res.parcial,
                    final:res.final,

                    statusmensagem:res.statusmensagem,
                    statusmartingale:res.statusmartingale,
                    statusparcialfinal:res.statusparcialfinal,
                    statuscoberturabranco:res.statuscoberturabranco,

                    manhainicio:res.manhainicio,
                    manhafim:res.manhafim,
                    tardeinicio:res.tardeinicio,
                    tardefim:res.tardefim,
                    noiteinicio:res.noiteinicio,
                    noiteifim:res.noiteifim,
                    statusmanha:res.statusmanha,
                    statustarde:res.statustarde,
                    statusnoite:res.statusnoite,

                    tipomensagem:res.tipomensagem,
                }); 
            })

        }else if(tipoJogo.nome.includes('FootBallStudio')){
            
            tipoJogo.mensagensfootballstudio.map(async res=>{
                await MsgFutballStudio.create({
                    bot_id: grupo.id,
                    abertura:res.abertura,
                    fechamento:res.fechamento,
                    atencao:res.atencao,
                    cofirmacao:res.cofirmacao,
                    win:res.win,
                    loss:res.loss,
                    martingale:res.martingale,
                    branco:res.branco,
                    parcial:res.parcial,
                    final:res.final,

                    statusmensagem:res.statusmensagem,
                    statusmartingale:res.statusmartingale,
                    statusparcialfinal:res.statusparcialfinal,
                    statuscoberturabranco:res.statuscoberturabranco,
                    
                    
                    manhainicio:res.manhainicio,
                    manhafim:res.manhafim,
                    tardeinicio:res.tardeinicio,
                    tardefim:res.tardefim,
                    noiteinicio:res.noiteinicio,
                    noiteifim:res.noiteifim,
                    statusmanha:res.statusmanha,
                    statustarde:res.statustarde,
                    statusnoite:res.statusnoite,
                    
                    tipomensagem:res.tipomensagem,
                });
            })
       
            
        }else if(tipoJogo.nome.includes('Penalty')){
            
            tipoJogo.mensagenspenalty.map(async res=>{

                await MsgPenalty.create({
                    bot_id: grupo.id,
                    abertura:res.abertura,
                    fechamento:res.fechamento,
                    atencao: res.atencao,
                    cofirmacao:res.cofirmacao,

                    manhainicio:res.manhainicio,
                    manhafim:res.manhafim,
                    tardeinicio:res.tardeinicio,
                    tardefim:res.tardefim,
                    noiteinicio:res.noiteinicio,
                    noiteifim:res.noiteifim,
                    statusmanha:res.statusmanha,
                    statustarde:res.statustarde,
                    statusnoite:res.statusnoite,

                    tipomensagem:res.tipomensagem,
                }); 
            })
         
        }else if(tipoJogo.nome.includes("CPremium")){
                
             tipoJogo.mensagenspremium.map(async res=>{
                 await MsgPremium.create({
                    bot_id:grupo.id,
                    abertura:res.abertura,
                    fechamento:res.fechamento,
                    atencao:res.atencao,
                    win:res.win,
                    loss:res.loss,
                    parcial:res.parcial,
                    final:res.final,
                    statusparcialfinal:res.statusparcialfinal,
                    //padrao
                    tipomensagem:res.tipomensagem,
                    manhainicio:res.manhainicio,
                    manhafim:res.manhafim,
                    tardeinicio:res.tardeinicio,
                    tardefim:res.tardefim,
                    noiteinicio:res.noiteinicio,
                    noiteifim:res.noiteifim,
                    statusmanha:res.statusmanha,
                    statustarde:res.statustarde,
                    statusnoite:res.statusnoite,
                 })
             })

        }else if(tipoJogo.nome.includes("DPremium")){
         
            const msgPremium = await MsgPremium.create({
                bot_id:grupo.id,
                atencao:'🔔 Entrada confimada 🔔 \n\nPOSSÍVEL BRANCO ⚪️\n\n[LISTA_HORARIO] \n\nEntre [INTERVALO] ⚪️',

                win:'[HORARIO] ⚪️ | ✅✅✅✅✅✅',

                loss:'⛔⛔⛔⛔⛔⛔⛔',

                parcial:'🚀Resultado parcial\n\n✅([ACERTOS]) VS ❌([ERROS])\n\nAssertividade: [PORCENTAGEM_ACERTO]% \n\nTotal de ⚪️: [TOTAL_BRANCOS]',
                final:'🚀Resultado Final\n\n✅([ACERTOS]) VS ❌([ERROS])\n\nAssertividade: [PORCENTAGEM_ACERTO]% \n\nTotal de ⚪️: [TOTAL_BRANCOS]'
            }); 
        }else if(tipoJogo.nome == "Roleta"){
        
            tipoJogo.mensagensroleta.map(async res=>{
                await MsgRoleta.create({
                    bot_id:grupo.id,
                    abertura:res.abertura,
                    fechamento:res.fechamento,
                    atencao:res.atencao,
                    confirmacao:res.confirmacao,
                    win:res.win,
                    loss:res.loss,
                    martingale:res.martingale,
                    parcial:res.parcial,
                    final:res.final,
                    statusmartingale:res.statusmartingale,
                    statusparcialfinal:res.statusparcialfinal,
                    statuscoberturabranco:res.statuscoberturabranco,
                    tipomensagem:res.tipomensagem,
                    manhainicio:res.manhainicio,
                    manhafim:res.manhafim,
                    tardeinicio:res.tardeinicio,
                    tardefim:res.tardefim,
                    noiteinicio:res.noiteinicio,
                    noiteifim:res.noiteifim,
                    statusmanha:res.statusmanha,
                    statustarde:res.statustarde,
                    statusnoite:res.statusnoite,
              
                })
            })

        }else{
            //Mensagem Crash
            const msgCrash = await MsgCrash.create({
                bot_id:grupo.id,
                atencao:'⚠️ ATENÇÃO, possível entrada [ENTRADA] \n⌚️ Aguarde a confirmação \n🎰 Blaze: <a href="https://blaze.com/pt/games/crash">Crash</a>',

                confirmacao:'🔔 Entrada Confirmada 🔔 \n🎰 Blaze: <a href="https://blaze.com/pt/games/crash">Crash</a> \💰 Entrar após [ULTIMA_VELA] \n🚀 Auto retirar [ENTRADA]',

                win:'✅✅✅GREEN - BATEU META? VAZA \n[NUMEROS_SEQUENCIA]',

                loss:'⛔ RED - SEGUE GERENCIAMENTO \n[NUMEROS_SEQUENCIA]',

                martingale:'🔁 [NUMERO]º Martingale!',

                parcial:'🚀Resultado parcial\n✅([ACERTOS]) VS ❌([ERROS])\nAssertividade: [PORCENTAGEM_ACERTO]',
                final:'🚀Resultado Final\n✅([ACERTOS]) VS ❌([ERROS])\nAssertividade: [PORCENTAGEM_ACERTO]'
            }); 
        }


        return res.status(201).json({
            resolucao:true,
            msg:"Grupo cadastrado com sucesso",
            teste:tipoJogo,
        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},

async show(req,res){
    try{
       const { id } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }
       const grupo = await Grupo.findOne({
        where:{ id:id, },
        include:[
            {association:"tipojogo"},
        ]
       });
       const bot_token_decrypt = await decrypt(grupo.iv_bot_token,grupo.bot_token);
       const chat_id_decrypt = await decrypt(grupo.iv_chat_id,grupo.chat_id);
       const chat_id_decrypt_free = await decrypt(grupo.iv_chat_id_free,grupo.chat_id_free);

       grupo.bot_token = bot_token_decrypt;
       grupo.chat_id  =chat_id_decrypt;
       grupo.chat_id_free  =chat_id_decrypt_free;
       return res.status(201).send({
           grupo:grupo
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async update(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
    const {id} = req.params;
    const {nome,tipojogo_id,bot_token,chat_id,usuario_id,chat_id_free} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(tipojogo_id, 'tipojogo_id', 'O jogo é obrigatorio');
        contract.isRequired(bot_token, 'bot_token', 'O bot_token é obrigatorio');
        contract.isRequired(chat_id, 'chat_id', 'O chat_id é obrigatorio');
        contract.isRequired(usuario_id, 'usuario_id', 'O usuario é obrigatorio');
        contract.isRequired(chat_id_free, 'chat_id_free', 'O chat_id é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        const tipoJogo = await TipoJogo.findOne({
            where:{ id:tipojogo_id }
    
           });
        if(!tipoJogo){
            return res.status(201).json({
                msg:'Jogo não existe dd' ,
            
            })
        }
        const grupoOld = await Grupo.findOne({
            where:{ id:id }
           });
        if(!grupoOld){
            return res.status(201).json({
                msg:'Grupo não existe',
            
            })
        }


    const bot_tokenCripto= await encrypt(bot_token);
    const chat_idCripto= await encrypt(chat_id);
    const [iv_bot_token, encripytToken] = bot_tokenCripto.split(':');
    const [iv_chat_id, encript_chatid] = chat_idCripto.split(':');

    const chat_idCripto_free= await encrypt(chat_id_free);
    const [iv_chat_id_free, encript_chatid_free] = chat_idCripto_free.split(':');

    const grupo = await grupoOld.update({
        nome,
        tipojogo_id:tipoJogo.id,
        bot_token:encripytToken,
        chat_id:encript_chatid,
        chat_id_free:encript_chatid_free,
        iv_bot_token:iv_bot_token,
        iv_chat_id:iv_chat_id,
        iv_chat_id_free:iv_chat_id_free,
        usuario_id,
    }); 

    return res.status(201).json({
        msg:"Grupo Atualizado com sucesso",
        data:grupo

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},

async zerawinloss(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const {id} = req.params;
        
        const grupoOld = await Grupo.findOne({
                where:{ id:id }
        
            });
        if(!grupoOld){
            return res.status(201).json({
                msg:'Grupo não existe',
            
            })
        }

   
    const grupo = await grupoOld.update({
       win:0,
       loss:0
    }); 

    return res.status(201).json({
        msg:"Grupo Atualizado com sucesso",
        data:grupo

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}
},

async mudastatus(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const {id} = req.params;
        const grupo = await Grupo.findOne({
            where: {
                [Op.and]: [
                  { usuario_id: usuarioLogado.id },
                  { id:id }
                ]
              }
    
           });
        if(!grupo){
            return res.status(200).send({
                msg:'Grupo não existe'
            });
        }
        ///Colocar o shell aqui
        if(grupo.status == "A"){
                //     shell.exec(`pm2 stop  '${usuario.email}'`, 
                //     function(code, output) {
                
                //   });
            const grupoAtualizado = grupo.update({
                status:"I"
            })
            return res.status(201).send({
                msg:"Grupo Desligado",
                
            })
        }
        else{
        //     shell.exec(`pm2 start ${process.env.APP_CAMINHO} --name '${usuario.email}' --interpreter=python3.8  -- '${usuario.id}'  --no-autorestart`, 
        //        function(code, output,err) {

        //    });
            const grupoAtualizado = grupo.update({
                status:"A"
            })
            return res.status(201).send({
                msg:"Grupo Ligado",
                
            })
        }
       

       
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},


async ligarbot(req,res){
    try{
       const { id } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }
       var grupo = new Grupo();
     
        grupo = await Grupo.findOne(
            {where:{ id:id },  
            include:[
            {association:"tipojogo"},
            ]
        });
      
       if(!grupo){
        return res.status(201).json({
            msg:'Grupo não existe',
        })
       }


     if(grupo.status == "I"){
        pm2.connect(function(err) {
            if (err) {
             console.error(err)
             process.exit(2)
            }
           
           pm2.start({
               script    : `${grupo.tipojogo.caminho_robo}`,
               name      : `${grupo.nome + grupo.id}`,
               args      : `${grupo.id}`,
               interpreter:'python3.8',
               }, function(err, apps) {
                  console.log(err);
               })
              
            })
            pm2.disconnect();
            const g = await grupo.update({
                status:"A",
            })

     }else{

        pm2.connect(function(err) {
            if (err) {
             console.error(err)
             process.exit(2)
            }
            
            pm2.stop(`${grupo.nome + grupo.id}`, function (err, proc) {
                //console.log(err,proc);
                 pm2.disconnect();
              })

            })

            const g = await grupo.update({
                status:"I",
            })
      
     }

       return res.status(201).send({
         msg:"grupo atualizado",
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},


async reinicarbot(req,res){
    try{
        
            const { id } = req.params;
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const usuarioLogado = await authService.decodeToken(token);
            console.log('entrou no dsfsd')
            console.log(id)
            if(!usuarioLogado){
                return res.status(201).json({
                    msg:'Usuario não existe',
                   
                })
            }
            var grupo = new Grupo();
            if(usuarioLogado.permissoes.length > 0){
             grupo = await Grupo.findOne({where:{ id:id }});
            }else{
                grupo = await Grupo.findOne({
                    where: {
                        [Op.and]: [
                          { usuario_id: usuarioLogado.id },
                          { id:id }
                        ]
                      }
                });

            }
            if(!grupo){
             return res.status(201).json({
                 msg:'Grupo não existe',
             })
             }
 
        pm2.connect(function(err) {
            if (err) {
             console.error(err)
             process.exit(2)
            }
            
            pm2.restart(`${grupo.nome + grupo.id}`, function (err, proc) {
                //console.log(err,proc);
                 pm2.disconnect();
              })

            })

            return res.status(201).send({
                msg:'Bot reiniciado',
              })
      

    }catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},



async excluirgrupo(req,res){
         
    try{
        const { id } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const grupoOld = await Grupo.findOne({
            where: {id:id}
    
           });

     
          if(!grupoOld){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }



    const grupo = await Grupo.destroy({where:{id:grupoOld.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Grupo Excluida com sucesso",
        data:grupo

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
        error:err.message
    })
}

},

async bucaGrupoRodrigo(req,res){
    const { id } = req.params;
       const grupo = await Grupo.findByPk(id,
        {include:[
            {association:"usuario"},
            {association:"mensagensfutballstudio"},
            {association:"mensagenscrash"},
            {association:"mensagensdouble"},
            {association:"mensagensroleta"},
            {association:"mensagenspremium"},
            {association:"mensagensfantan"},
            {association:"mensagenspenalty"},
            {association:"mensagensminer"},
            {association:"mensagensaviator"},
            {association:"mensagensfurtunetiger"},
        ]},

        );
        if(!grupo){
            return res.status(201).json({
                msg:'Grupo não existe',
            
            })
        }
        const tipoJogo = await TipoJogo.findOne( {where:{id:grupo.tipojogo_id},
           include:[
                {association:"estrategiascrash"},
                {association:"estrategiasdouble"},
                {association:"estrategiasroleta"},
                {association:"estrategiacrashpremium"},
                {association:"estrategiasfantan"},
                {association:"estrategiadoublepremium"},
                {association:"estrategiasfutballstudio"},
                {association:"estrategiapenalty"},
                {association:"estrategiasminers"},
                {association:"estrategiasaviator"},
                {association:"estrategiasroleta"},
            ]},
    
        );

        const bot_token_decrypt = await decrypt(grupo.iv_bot_token,grupo.bot_token);
        const chat_id_decrypt = await decrypt(grupo.iv_chat_id,grupo.chat_id);
        const chat_id_free_decrypt = await decrypt(grupo.iv_chat_id_free,grupo.chat_id_free);
       
        grupo.bot_token = bot_token_decrypt;
        grupo.chat_id  =chat_id_decrypt;
        grupo.chat_id_free  =chat_id_free_decrypt;
        return res.status(201).send({
            grupo:grupo,
            padroes:tipoJogo
        })
},



   
}

