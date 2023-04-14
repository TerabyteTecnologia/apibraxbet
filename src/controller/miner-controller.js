'use strict';

const Grupo = require('../models/dtb_bots');
const TipoJogo = require('../models/dtb_tipojogo');

 const Miner = require('../models/dtb_estrategia_miner');
 const MinerMensagem = require('../models/dtb_mensagem_miner');

 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");
module.exports = {
 




//Miner estarategia  ############################################################################
async showEstrategia(req,res){
    try{
       const { id } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }

       

      
       var tipoJogo = new TipoJogo();
       if(usuarioLogado.permissoes.length > 0){
        tipoJogo = await TipoJogo.findOne({where:{ id:id }});
       }else{
        tipoJogo = await TipoJogo.findOne({where:{ id:id }});
       }
     

       if(!tipoJogo){
        return res.status(201).json({
            msg:'Jogo não existe',
           
        })
       }

       
    const miner = await Miner.findOne({
        where: {bot_id:id},
        order: [ [ 'id', 'DESC' ]],
        });

       return res.status(201).send({
        miner
       })

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async updadeMiner(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
     
        const { id } = req.params;
        const {espera,tentativas,minas_a,minas_b,entrada_a,entrada_b} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(espera, 'espera', 'A espera é obrigatorio');
        contract.isRequired(tentativas, 'tentativas', 'A tentativa a é obrigatorio');
        contract.isRequired(minas_a, 'minas_a', 'A minas_a a é obrigatorio');
        contract.isRequired(minas_b, 'minas_b', 'A minas_b a é obrigatorio');
        contract.isRequired(entrada_a, 'entrada_a', 'A entrada_a a é obrigatorio');
        contract.isRequired(entrada_b, 'entrada_b', 'A entrada_b a é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
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
        const minerOld = await Miner.findOne({
            where: {bot_id:id},
            order: [ [ 'id', 'DESC' ]],
            });
 
    
            if(!minerOld){
                const miner = await Miner.create({
                    bot_id: id,
                    espera,
                    tentativas,
                    minas_a,
                    minas_b,
                    entrada_a,
                    entrada_b
                }); 
                return res.status(201).json({
                    resolucao:true,
                    msg:"Miner cadastrado com sucesso",
                    data:miner
        
                })
            }

            
   
    const minerUpdate = await minerOld.update({
        espera,
        tentativas,
        minas_a,
        minas_b,
        entrada_a,
        entrada_b
    }); 

    return res.status(201).json({
        msg:"Miner Atualizado com sucesso",
        miner:minerUpdate

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},

//Miner Mensagem  ############################################################################
async showMenssagemMiner(req,res){
    try{
        const { id,tipo } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
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


    const msgcrash = await MinerMensagem.findOne({
        where: {bot_id:id,tipomensagem:tipo},
        order: [ [ 'id', 'DESC' ]],
        });

       return res.status(201).send({
        mensageminer:msgcrash
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async updateMessageMiner(req,res){
         
try{
        //id do bottt
        const {id} = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
            })
        }
  
    const {
        abertura,
        fechamento,
        atencao,
        confirmacao,
        parcial,
        final,
        padrao_entrada,
        padrao_nao_entrada,
        statusparcialfinal,
        tipo,
        statusmanha,
        statustarde,
        statusnoite,
        manhainicio,
        manhafim,
        tardeinicio,
        tardefim,
        noiteinicio,
        noiteifim,
    } = req.body;
        let contract = new ValidationContract();
        contract.isRequired(atencao, 'atencao', 'A atencao é obrigatorio');
        contract.isRequired(confirmacao, 'confirmacao', 'O confirmacao é obrigatorio');
        contract.isRequired(padrao_entrada, 'padrao_entrada', 'O padrao_entrada é obrigatorio');
        contract.isRequired(padrao_nao_entrada, 'padrao_nao_entrada', 'O loss é obrigatorio');
        contract.isRequired(tipo, 'tipo', 'O cofirmacao é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        
     
         var grupo = await Grupo.findOne({where:{ id:id }});
       

        if(!grupo){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }


        const msgOld = await MinerMensagem.findOne({
            where: {bot_id:id,tipomensagem:tipo},
            order: [ [ 'id', 'DESC' ]],
        });
 
        if(!msgOld){
            if(tipo == 1){
            const msgCrash = await MinerMensagem.create({
                bot_id: id,
                abertura,
                fechamento,
                atencao,
                confirmacao,
                parcial,
                final,
                padrao_entrada,
                padrao_nao_entrada,
                statusparcialfinal,
                statusmanha,
                statustarde,
                statusnoite,
                manhainicio,
                manhafim,
                tardeinicio,
                tardefim,
                noiteinicio,
                noiteifim,
            });
        }else{
            const msgCrash = await MinerMensagem.create({
                bot_id: id,
                atencao,
                confirmacao,
                parcial,
                final,
                padrao_entrada,
                padrao_nao_entrada,
                statusparcialfinal,
            });
        }
        
            return res.status(201).json({
                resolucao:true,
                msg:"Mensagem cadastrado com sucesso",
            
            })
        }

        if(tipo == 1){
        const msgCrash = await msgOld.update({
            abertura,
            fechamento,
            atencao,
            confirmacao,
            parcial,
            final,
            tipo,
            padrao_entrada,
            padrao_nao_entrada,
            statusparcialfinal,
            statusmanha,
            statustarde,
            statusnoite,
            manhainicio,
            manhafim,
            tardeinicio,
            tardefim,
            noiteinicio,
            noiteifim,
            
        }); 
        }else{
            const msgCrash = await msgOld.update({
                atencao,
                confirmacao,
                parcial,
                final,
                padrao_entrada,
                padrao_nao_entrada,
                statusparcialfinal,
                tipo
                
            }); 
        }

    return res.status(201).json({
        msg:"Mensagem Atualizado com sucesso",
    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


}

