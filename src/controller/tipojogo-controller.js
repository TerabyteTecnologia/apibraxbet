'use strict';
require('dotenv').config();

 const TipoJogo = require('../models/dtb_tipojogo');
 const EstrategiaDouble = require('../models/dtb_estrategia_double');
 const EstrategiaFantan = require('../models/dtb_estrategia_fantan');
 const EstrategiaFutbalStudio = require('../models/dtb_estrategia_futballstudio');
 const EstrategiaAviator = require('../models/dtb_estrategia_aviator');
 const EstrategiaPenalty = require('../models/dtb_estrategia_penalty');
 const EstrategiaCrash = require('../models/dtb_estrategia_crash');
 const EstrategiaCrashPremium = require('../models/dtb_estrategiapremium_crash');
 const EstrategiaDoublePremium= require('../models/dtb_estrategiapremium_double');
 const EstrategiaRoleta = require('../models/dtb_estrategia_bet365');
 const EstrategiaMiner = require('../models/dtb_estrategia_miner');

 const ValidationContract = require("../validator/fluent-validators");

 const authService = require('../services/auth-services');

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


        const {nome,coleta_dados,nome_tabela,caminho_robo,link_acesso,tipo_jogo} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(tipo_jogo, 'tipo_jogo', 'O tipo_jogo é obrigatorio');
        contract.isRequired(coleta_dados, 'coleta_dados', 'O dados é obrigatorio');
        contract.isRequired(nome_tabela, 'nome_tabela', 'O dado é obrigatorio');
        contract.isRequired(caminho_robo, 'caminho_robo', 'O dado é obrigatorio');
        contract.isRequired(link_acesso, 'link_acesso', 'O dado é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
        const tipoJogo = await TipoJogo.create({
            nome,
            tipo_jogo,
            coleta_dados,
            nome_tabela,
            caminho_robo,
            link_acesso,
            
        }); 

        console.log("tipo de",tipoJogo)
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

         
        }else if(tipoJogo.nome.includes('Aviator')){
          //Estrategias futballstudio #################################
          await EstrategiaAviator.create({
          bot_id:tipoJogo.id,
          nome:'Sequencia ROSA,ROXO,AZUL',
          sequencia:'ROSA,ROXO,AZUL',
          apostar_em:'1.5',
          martingale:'2',
      }); 
      
        }else if(tipoJogo.nome.includes('Miner')){
          await EstrategiaMiner.create({
              bot_id:tipoJogo.id,
              espera:2,
              tentativas:2,
              minas_a:2,
              minas_b:2,
              entrada_a:2,
              entrada_b:2,
          }); 
        
        }else if(tipoJogo.nome.includes('Fantan')){
          //Estrategias fantans
          await EstrategiaFantan.create({
              bot_id:tipoJogo.id,
              nome:'Sequencia 5 preto',
              sequencia:'2,2,2,2,2,2',
              apostar_em:'1',
              martingale:'2',
          }); 

          await EstrategiaFantan.create({
              bot_id:tipoJogo.id,
              nome:'Sequencia 5 vermelho',
              sequencia:'1,1,1,1,1,1',
              apostar_em:'2',
              martingale:'2',
          }); 


          await EstrategiaFantan.create({
              bot_id:tipoJogo.id,
              nome:'Alternancia 5 preto',
              sequencia:'1,2,1,2,1',
              apostar_em:'2',
              martingale:'2',
          }); 

          await EstrategiaFantan.create({
              bot_id:tipoJogo.id,
              nome:'Dois em dois vermelho',
              sequencia:'1,1,2,2,1',
              apostar_em:'1',
              martingale:'2',
          }); 
          
   
        }else if(tipoJogo.nome.includes('FutbalStudio')){
          //Estrategias futballstudio #################################
          await EstrategiaFutbalStudio.create({
          bot_id:tipoJogo.id,
          nome:'Sequencia 5 preto',
          sequencia:'V,V,C,C,E,E',
          apostar_em:'V',
          martingale:'2',
      }); 
   
        }else if(tipoJogo.nome.includes('Penalty')){
          await EstrategiaPenalty.create({
              bot_id:tipoJogo.id,
              esperar:2,
              tentativa:2,
          }); 
       
        }else if(tipoJogo.nome.includes("CPremium")){             
          const crash = await EstrategiaCrashPremium.create({
              bot_id:tipoJogo.id,
              nome:"Estratégia Padrão",
              sair:0,
              aguardar:7,
              notificar:3,
              lista:4,
              sair_em:5
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

      }else if(tipoJogo.nome.includes('Aviator')){
          //Estrategias futballstudio #################################
          await EstrategiaAviator.create({
          bot_id:tipoJogo.id,
          nome:'Sequencia ROSA,ROXO,AZUL',
          sequencia:'ROSA,ROXO,AZUL',
          apostar_em:'1.5',
          martingale:'2',
          }); 
      
       
      }else if(tipoJogo.nome.includes('Miner')){
          await EstrategiaMiner.create({
              bot_id:tipoJogo.id,
              espera:2,
              tentativas:2,
              minas_a:2,
              minas_b:2,
              entrada_a:2,
              entrada_b:2,
          }); 
        
      }else if(tipoJogo.nome.includes('Fantan')){
          //Estrategias fantans
          await EstrategiaFantan.create({
              bot_id:tipoJogo.id,
              nome:'Sequencia 5 preto',
              sequencia:'2,2,2,2,2,2',
              apostar_em:'1',
              martingale:'2',
          }); 

          await EstrategiaFantan.create({
              bot_id:tipoJogo.id,
              nome:'Sequencia 5 vermelho',
              sequencia:'1,1,1,1,1,1',
              apostar_em:'2',
              martingale:'2',
          }); 


          await EstrategiaFantan.create({
              bot_id:tipoJogo.id,
              nome:'Alternancia 5 preto',
              sequencia:'1,2,1,2,1',
              apostar_em:'2',
              martingale:'2',
          }); 

          await EstrategiaFantan.create({
              bot_id:tipoJogo.id,
              nome:'Dois em dois vermelho',
              sequencia:'1,1,2,2,1',
              apostar_em:'1',
              martingale:'2',
          }); 
          
      }else if(tipoJogo.nome.includes('FutbalStudio')){
          //Estrategias futballstudio #################################
          await EstrategiaFutbalStudio.create({
          bot_id:tipoJogo.id,
          nome:'Sequencia 5 preto',
          sequencia:'V,V,C,C,E,E',
          apostar_em:'V',
          martingale:'2',
         }); 
   
      }else if(tipoJogo.nome.includes('Penalty')){
          await EstrategiaPenalty.create({
              bot_id:tipoJogo.id,
              esperar:2,
              tentativa:2,
          }); 
       
      }else if(tipoJogo.nome.includes("CPremium")){
              
          const crash = await EstrategiaCrashPremium.create({
              bot_id:tipoJogo.id,
              nome:"Estratégia Padrão",
              sair:0,
              aguardar:7,
              notificar:3,
              lista:4,
              sair_em:5
          }); 
      
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
    const {nome,coleta_dados,nome_tabela,caminho_robo,link_acesso,tipo_jogo} = req.body;
    let contract = new ValidationContract();
    contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
    contract.isRequired(tipo_jogo, 'tipo_jogo', 'O tipo_jogo é obrigatorio');
    contract.isRequired(coleta_dados, 'coleta_dados', 'O dados é obrigatorio');
    contract.isRequired(nome_tabela, 'nome_tabela', 'O dado é obrigatorio');
    contract.isRequired(caminho_robo, 'caminho_robo', 'O dado é obrigatorio');
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
        tipo_jogo,
        coleta_dados,
        nome_tabela,
        caminho_robo,
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




   
}

