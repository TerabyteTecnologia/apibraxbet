'use strict';
require('dotenv').config();

 const TipoJogo = require('../models/dtb_tipojogo');
 const EstrategiaDouble = require('../models/dtb_estrategia_double');



 const EstrategiaCrash = require('../models/dtb_estrategia_crash');
 const EstrategiaDoublePremium= require('../models/dtb_estrategiapremium_double');
 const EstrategiaRoleta = require('../models/dtb_estrategia_bet365');





 const pm2 = require('pm2')
 const ValidationContract = require("../validator/fluent-validators");

 const authService = require('../services/auth-services');
const { createMiner, createAviator, createFootBallStudio, createPenalty, createFantan, createCPremium, updatewinlossJogo } = require('../services/helper-creater');

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
           var tipoJogos = new TipoJogo();
           if(usuarioLogado.permissoes.length > 0){
            tipoJogos = await TipoJogo.findAll()
           }else{
            tipoJogos = await TipoJogo.findAll()
           }
          

        return  res.status(200).send({
            jogos:tipoJogos
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
                msg:'Usuario não existe',
               
            })
        }


        const {nome,coleta_dados,nome_tabela,caminho_robo,caminho_robo_adm,link_acesso,tipo_jogo,descricao} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(caminho_robo, 'caminho_robo', 'O dado é obrigatorio');
        contract.isRequired(caminho_robo_adm, 'caminho_robo_adm', 'O dado é obrigatorio');
        contract.isRequired(link_acesso, 'link_acesso', 'O dado é obrigatorio');
        contract.isRequired(descricao, 'descricao', 'A descricao é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
        const tipoJogo = await TipoJogo.create({
            descricao,
            nome,
            caminho_robo,
            caminho_robo_adm,
            link_acesso,
            
        }); 

   
        ///Monta as estrategias e mensagem ;;;;; melhorar isso atravazes de utils
        if(tipoJogo.nome.includes('Double')){

          //Estrategias doubles
              await EstrategiaDouble.create({
                  bot_id:tipoJogo.id,
                  nome:'Sequencia 5 preto',
                  sequencia:'2,2,2,2,2,2',
                  apostar_em:'1',
                  martingale:'2',
              }); 

              await EstrategiaDouble.create({
                  bot_id:tipoJogo.id,
                  nome:'Sequencia 5 vermelho',
                  sequencia:'1,1,1,1,1,1',
                  apostar_em:'2',
                  martingale:'2',
              }); 


              await EstrategiaDouble.create({
                  bot_id:tipoJogo.id,
                  nome:'Alternancia 5 preto',
                  sequencia:'1,2,1,2,1',
                  apostar_em:'2',
                  martingale:'2',
              }); 

              await EstrategiaDouble.create({
                  bot_id:tipoJogo.id,
                  nome:'Alternancia 5 vermelho',
                  sequencia:'2,1,2,1,2',
                  apostar_em:'1',
                  martingale:'2',
              }); 
              
              await EstrategiaDouble.create({
                  bot_id:tipoJogo.id,
                  nome:'Dois em dois preto',
                  sequencia:'2,2,1,1,2',
                  apostar_em:'2',
                  martingale:'2',
              });
              
              
              await EstrategiaDouble.create({
                  bot_id:tipoJogo.id,
                  nome:'Dois em dois vermelho',
                  sequencia:'1,1,2,2,1',
                  apostar_em:'1',
                  martingale:'2',
              }); 

         
        }else if(tipoJogo.nome.includes('Crash')){
           await createAviator(tipoJogo.id)
      
        }else if(tipoJogo.nome.includes('Mines')){

            await createMiner(tipoJogo.id);
       

        
        }else if(tipoJogo.nome.includes('Fantan')){
          await createFantan(tipoJogo.id)
          
   
        }else if(tipoJogo.nome.includes('FootBallStudio')){
          //Estrategias futballstudio #################################
          await createFootBallStudio(tipoJogo.id)
   
        }else if(tipoJogo.nome.includes('Penalty')){
            await createPenalty(tipoJogo.id)
       
        }else if(tipoJogo.nome.includes("CPremium")){             
         await createCPremium(tipoJogo.id);

        }else if(tipoJogo.nome.includes("DPremium")){
          const doublepremium = await EstrategiaDoublePremium.create({
              bot_id:tipoJogo.id,
              nome:"Estratégia Padrão",
              aguardar:7,
              intervalo:3,
              lista:4,
          }); 
        
        }else if(tipoJogo.nome == "Roleta"){
      
      let rouletes_name=[
              "Super Spin Roulette",
              "bet365 Roulette",
              "bet365 Dutch Roulette",
              "Who Wants To Be a Millionaire Roulette",
              "Mega Fire Blaze Roulette Live",
              "Quantum Roulette Live",
              "Roulette",
              "Age Of The Gods Bonus Roulette",
              "Football Roulette",
              "Hindi Roulette",
              "Speed Roulette",
              "Greek  Roulette",
              "Turkish Roulette",
              "Roleta Brasileira",
              "Quantum Auto Roulette",
              "Speed Auto Roulette",
              "Prestige Roulette",
              "American Roulette",
              "Spread Bet Roulette",
              "Deutsches Roulette",
              "Auto Roulette",
              "Greek Quantum Roulette",
              "UK Roulette",
              "Quantum Roulette Italiana",
              "Triumph Roulette",
              "Roulette Italiana",
          ]

          rouletes_name.forEach( async (res) =>{

              await EstrategiaRoleta.create({
                  bot_id:tipoJogo.id,
                  nome_roleta:res,
                  sequencia_cor:11,
                  sequencia_maior_menor:11,
                  sequencia_par_impar:11,
                  sequencia_duzias:8,
                  sequencia_colunas:8,
                  martingale:2,
                  status:1,
              }); 

          })

        
          
          
        }else{
          //Estrategia Crash
          await EstrategiaCrash.create({
              bot_id:grupo.id,
              nome:'Jogada 1.5',
              sequencia:3,
              valor_a:1,
              valor_b:1.5,
              apostar_em:1.5,
              martingale:2,
          });
          
          await EstrategiaCrash.create({
              bot_id:grupo.id,
              nome:'Jogada 2.0',
              sequencia:8,
              valor_a:1,
              valor_b:1.5,
              apostar_em:2,
              martingale:2,
          }); 
      
        }

        return res.status(201).json({
            resolucao:true,
            msg:"Tipo de jogo cadastrado com sucesso",

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
       const tipoJogo = await TipoJogo.findOne({
        where:{ id:id }

       });
        
       return res.status(201).send({
           jogo:tipoJogo
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
    const {nome,coleta_dados,nome_tabela,caminho_robo,link_acesso,caminho_robo_adm} = req.body;
    let contract = new ValidationContract();
    contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
    contract.isRequired(caminho_robo, 'caminho_robo', 'O dado é obrigatorio');
    contract.isRequired(caminho_robo_adm, 'caminho_robo_adm', 'O dado é obrigatorio');
    contract.isRequired(link_acesso, 'link_acesso', 'O dado é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
   
        const jogosOld = await TipoJogo.findOne({
            where:{ id:id }
    
           });
    if(!jogosOld){
        return res.status(201).json({
            msg:'Jogo não existe',
           
        })
    }


  

    const tipoJogos = await jogosOld.update({
        nome,
        caminho_robo,
        caminho_robo_adm,
        link_acesso,
    }); 

    return res.status(201).json({
        msg:"Jogos Atualizado com sucesso",
        data:tipoJogos

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


async excluirjogos(req,res){
         
    try{
        const { id } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const jogosOld = await TipoJogo.findOne({
            where: {id:id}
    
           });

     
          if(!jogosOld){
            return res.status(201).json({
                msg:'Jogos não existe',
               
            })
        }



    const tipoJogos = await TipoJogo.destroy({where:{id:jogosOld.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Jogos Excluida com sucesso",
        data:tipoJogos

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
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
        const tipoJogo = await TipoJogo.findOne({
            where: {id:id }
           });
        if(!tipoJogo){
            return res.status(200).send({
                msg:'Jogo não existe'
            });
        }
         console.log('tipoJogo',tipoJogo);

        if(tipoJogo.status_robo_adm == "I"){
            pm2.connect(function(err) {
                if (err) {
                 console.error(err)
                 process.exit(2)
                }
               
               pm2.start({
                   script    : `${tipoJogo.caminho_robo_adm}`,
                   name      : `maneger_${tipoJogo.nome}`,
                   args      : `${tipoJogo.id}`,
                   interpreter:'python3.8',
                   }, function(err, apps) {
                      console.log(err);
                   })
                  
                })
                pm2.disconnect();
                 await tipoJogo.update({
                    status_robo_adm:"A",
                })
    
         }else{
    
            pm2.connect(function(err) {
                if (err) {
                 console.error(err)
                 process.exit(2)
                }
                
                pm2.stop(`maneger_${tipoJogo.nome}`, function (err, proc) {
                    //console.log(err,proc);
                     pm2.disconnect();
                  })
    
                })
    
                const g = await tipoJogo.update({
                    status_robo_adm:"I",
                })
          
         }

         return res.status(201).send({
            msg:"Jogo atualizado",
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
        
        const tipoOld = await TipoJogo.findOne({
                where:{ id:id }
        
            });
        if(!tipoOld){
            return res.status(201).json({
                msg:'Jogo não existe',
            
            })
        }

   
    const jogo = await tipoOld.update({
       win:0,
       loss:0
    }); 

    return res.status(201).json({
        msg:"Jogo Atualizado com sucesso",
        data:jogo

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}
},


async bucaGrupoRodrigoJogo(req,res){
    const { id } = req.params;
    
        const tipoJogo = await TipoJogo.findOne( {where:{id:id},
           include:[
                {association:"estrategiascrash"},
                {association:"estrategiasdouble"},
                {association:"estrategiasbet"},
                {association:"estrategiacrashpremium"},
                {association:"estrategiasfantan"},
                {association:"estrategiadoublepremium"},
                {association:"estrategiasfutballstudio"},
                {association:"estrategiapenalty"},
                {association:"estrategiasminers"},
                {association:"estrategiasaviator"},

                {association:"mensagensfantan"},
                {association:"mensagensaviator"},
                {association:"mensagensminer"},
                {association:"mensagensfootballstudio"},
                {association:"mensagenspenalty"},
                {association:"mensagenspremium"},
            ]},
    
        );

       

        return res.status(201).send({
            padroes:tipoJogo
        })
},

async updatewinloss(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
      
        const {win,loss,id} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(win, 'win', 'O win é obrigatorio');
        contract.isRequired(loss, 'loss', 'O loss é obrigatorio');
        contract.isRequired(id, 'id', 'O id é obrigatorio');
    

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };

        await updatewinlossJogo(win,loss,id)
      
    return res.status(201).json({
        msg:"Jogo Atualizado com sucesso",

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}
},

   
}

