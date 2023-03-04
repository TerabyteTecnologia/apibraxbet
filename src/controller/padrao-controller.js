'use strict';

 const Grupo = require('../models/dtb_tipojogo');
 const MsgFantan = require('../models/dtb_mensagem_padrao_fantan');
 const MsgAviator = require('../models/dtb_mensagem_padrao_aviator');
 const MinerMensagem = require('../models/dtb_mensagem_padrao_miner');
 const MsgFutballStudio = require('../models/dtb_mensagem_padrao_futballstudio');
 const MsgPenalty = require('../models/dtb_mensagem_padrao_penalty');
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
            grupo = await Grupo.findOne({where:{ id:id }});
        }
        

        if(!grupo){
            return res.status(201).json({
                msg:'Jogo não existe',
            
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
            abertura,
            fechamento,
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
                abertura,
                fechamento,
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
                abertura,
                fechamento,
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
  
    //Aviator Mensagem ############################################################################
    //Mensagem  ############################################################################
    async showMensagemaviator(req,res){
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
            grupo = await Grupo.findOne({where:{ id:id }});
        }
        

        if(!grupo){
            return res.status(201).json({
                msg:'Grupo não existe',
            
            })
        }


        const msgdouble = await MsgAviator.findOne({
            where: {bot_id:id,tipomensagem:tipo},
            order: [ [ 'id', 'DESC' ]],
            });

        return res.status(201).send({
            mensagemaviator:msgdouble
        })
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }

    },
    async updateMensagemaviator(req,res){
            
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
            cofirmacao,
            win,
            loss,
            martingale,
            branco,
            parcial,
            final,
            tipo,
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
        
        } = req.body;
            let contract = new ValidationContract();
            contract.isRequired(atencao, 'atencao', 'A atencao é obrigatorio');
            contract.isRequired(cofirmacao, 'cofirmacao', 'O cofirmacao é obrigatorio');
            contract.isRequired(win, 'win', 'O win é obrigatorio');
            contract.isRequired(loss, 'loss', 'O loss é obrigatorio');
            contract.isRequired(martingale, 'martingale', 'O martingale é obrigatorio');
            contract.isRequired(tipo, 'tipo', 'O cofirmacao é obrigatorio');

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

        
            const msgOld = await MsgAviator.findOne({
                where: {bot_id:id,tipomensagem:tipo},
                order: [ [ 'id', 'DESC' ]],
                });
    
        if(!msgOld){
            if(tipo == 1){
                await MsgAviator.create({
                    bot_id: id,
                    abertura,
                    fechamento,
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
            const msgdouble = await MsgAviator.create({
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
                msg:"Mensagem cadastrado com sucesso",
            

            })
        
        }

    if(tipo ==1){
    await msgOld.update({
            abertura,
            fechamento,
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
    }
    else{
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

   //Miner Mensagem ############################################################################
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
            grupo = await Grupo.findOne({where:{ id:id }});
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
    
    
            const msgOld = await MinerMensagem.findOne({
                where: {bot_id:id,tipomensagem:tipo},
                order: [ [ 'id', 'DESC' ]],
            });
     
            if(!msgOld){
                if(tipo == 1){
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
            }else{
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

    //FootBall Mensagem ############################################################################
    async showFutbalStuido(req,res){
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
            grupo = await Grupo.findOne({where:{ id:id }});
        }
        

        if(!grupo){
            return res.status(201).json({
                msg:'Grupo não existe',
            
            })
        }


        const msgdouble = await MsgFutballStudio.findOne({
            where: {bot_id:id,tipomensagem:tipo},
            order: [ [ 'id', 'DESC' ]],
            });

        return res.status(201).send({
            mensagemfutballstudio:msgdouble
        })
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }

    },
    async updateFutbalStuido(req,res){
            
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
            cofirmacao,
            win,
            loss,
            martingale,
            branco,
            parcial,
            final,
            tipo,
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

        
            const msgOld = await MsgFutballStudio.findOne({
                where: {bot_id:id,tipomensagem:tipo},
                order: [ [ 'id', 'DESC' ]],
                });
    
        if(!msgOld){
            if(tipo == 1){
                await MsgFutballStudio.create({
                    bot_id: id,
                    abertura,
                    fechamento,
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
            const msgdouble = await MsgFutballStudio.create({
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
                msg:"Mensagem cadastrado com sucesso",
            

            })
        
        }

    if(tipo ==1){
    await msgOld.update({
            abertura,
            fechamento,
            atencao,
            cofirmacao,
            win,
            loss,
            martingale,
            branco,
            parcial,
            final,
            tipo,
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
    }
    else{
        const msgDoubleRes = await msgOld.update({
            atencao,
            cofirmacao,
            win,
            loss,
            martingale,
            branco,
            parcial,
            final,
            tipo,
            statusmensagem,
            statusmartingale,
            statusparcialfinal,
            statuscoberturabranco,
        
        
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

    //Penalty Mensagem ############################################################################
    async showPenalty(req,res){
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
            grupo = await Grupo.findOne({where:{ id:id }});
        }
        

        if(!grupo){
            return res.status(201).json({
                msg:'Grupo não existe',
            
            })
        }


        const mensagempenalty = await MsgPenalty.findOne({
            where: {bot_id:id,tipomensagem:tipo},
            order: [ [ 'id', 'DESC' ]],
            });

        return res.status(201).send({
            mensagempenalty
        })
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }

    },
    async updatePenalty(req,res){
            
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
            cofirmacao,
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
            contract.isRequired(atencao, 'atencao', 'O cofirmacao é obrigatorio');
            contract.isRequired(cofirmacao, 'cofirmacao', 'O cofirmacao é obrigatorio');
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


            const msgOld = await MsgPenalty.findOne({
                where: {bot_id:id,tipomensagem:tipo},
                order: [ [ 'id', 'DESC' ]],
            });
    
        if(!msgOld){
            if(tipo == 1){
                const msgpenalty = await MsgPenalty.create({
                    bot_id: id,
                    abertura,
                    fechamento,
                    atencao,
                    cofirmacao,
                    statusmanha,
                    statustarde,
                    statusnoite,
                    manhainicio,
                    manhafim,
                    tardeinicio,
                    tardefim,
                    noiteinicio,
                    noiteifim,
                    tipo,
        
                }); 
            }else{
                const msgpenalty = await MsgPenalty.create({
                    bot_id: id,
                    atencao,
                    cofirmacao,
                    tipo,
        
                }); 
            }
        

            return res.status(201).json({
                resolucao:true,
                msg:"Mensagem cadastrado com sucesso",
            

            })
        
        }

        if(tipo == 1){
            const msgpenalty = await msgOld.update({
                abertura,
                fechamento,
                atencao,
                cofirmacao,
                statusmanha,
                statustarde,
                statusnoite,
                manhainicio,
                manhafim,
                tardeinicio,
                tardefim,
                noiteinicio,
                noiteifim,
                tipo,
            
        }); 
        }else{
        const msgpenalty = await msgOld.update({
                atencao,
                cofirmacao,
                tipo,
            
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