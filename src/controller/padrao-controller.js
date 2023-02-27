
'use strict';

const Grupo = require('../models/dtb_bots');
 const EstrategiaDouble = require('../models/dtb_estrategia_double');
 const EstrategiasfutballStudio = require('../models/dtb_estrategia_futballstudio');
 const EstrategiaFantan = require('../models/dtb_estrategia_padrao_fantan');
 const EstrategiaCrash = require('../models/dtb_estrategia_crash');
 const EstrategiaCrashPremium = require('../models/dtb_estrategiapremium_crash');
 const EstrategiaDoublePremium = require('../models/dtb_estrategiapremium_double');
 const EstrategiaRoleta = require('../models/dtb_estrategia_bet365');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");

 module.exports = {
    //Fantam  ############################################################################
    //Mensagem  ############################################################################
    async showFantan(req,res){
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


        const msgdouble = await MsgFantan.findOne({
            where: {bot_id:id,tipomensagem:tipo},
            order: [ [ 'id', 'DESC' ]],
            });

        return res.status(201).send({
            mensagemfantan:msgdouble
        })
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }

    },
    async updatefantan(req,res){
            
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
            atencao,
            cofirmacao,
            win,
            loss,
            martingale,
            branco,
            parcial,
            final,
            statusmensagem,
            statusmartingale,
            statusparcialfinal,
            statuscoberturabranco,
            
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
            contract.isRequired(cofirmacao, 'cofirmacao', 'O cofirmacao é obrigatorio');
            contract.isRequired(win, 'win', 'O win é obrigatorio');
            contract.isRequired(loss, 'loss', 'O loss é obrigatorio');
            contract.isRequired(martingale, 'martingale', 'O martingale é obrigatorio');
            contract.isRequired(tipo, 'tipo', 'O tipo é obrigatorio');

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


            const msgOld = await MsgFantan.findOne({
                where: {bot_id:id,tipomensagem:tipo},
                order: [ [ 'id', 'DESC' ]],
                });
    
        if(!msgOld){
            if(tipo == 1){
        await MsgFantan.create({
                bot_id: id,
                atencao,
                cofirmacao,
                win,
                loss,
                martingale,
                branco,
                parcial,
                final,
                statusmensagem,
                statusmartingale,
                statusparcialfinal,
                statuscoberturabranco,
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
            await MsgFantan.create({
                bot_id: id,
                atencao,
                cofirmacao,
                win,
                loss,
                martingale,
                branco,
                parcial,
                final,
                statusmensagem,
                statusmartingale,
                statusparcialfinal,
                statuscoberturabranco,

            }); 
        }

            return res.status(201).json({
                resolucao:true,
                msg:"Mensagem cadastrado com sucesso"+tipo,
            

            })
        
        }

        if(tipo == 1){
        const msgDoubleRes = await msgOld.update({
                atencao,
                cofirmacao,
                win,
                loss,
                martingale,
                branco,
                parcial,
                final,
                statusmensagem,
                statusmartingale,
                statusparcialfinal,
                statuscoberturabranco,
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
        const msgDoubleRes = await msgOld.update({
            atencao,
            cofirmacao,
            win,
            loss,
            martingale,
            branco,
            parcial,
            final,
            statusmensagem,
            statusmartingale,
            statusparcialfinal,
            statuscoberturabranco
        
    }); 
    }

        return res.status(201).json({
            msg:"Mensagem cadastrado com sucesso"+tipo,
    

        })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

    },
  
}