'use strict';

 const Grupo = require('../models/dtb_bots');
 const MsgDouble = require('../models/dtb_mensagem_double');
 const MsgFantan = require('../models/dtb_mensagem_fantan');
 const MsgFutballStudio = require('../models/dtb_mensagem_futballstudio');
 const MsgPenalty = require('../models/dtb_mensagem_penalty');
 const MsgCrash = require('../models/dtb_mensagem_crash');
 const MsgPremium = require('../models/dtb_mensagem_premium');
 const MsgRoleta = require('../models/dtb_mensagem_bet365');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");
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
              grupos = await Grupo.findAll();
        }else{
            grupos = await Grupo.findAll({where:{usuario_id:usuarioLogado.id}})
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
        const {nome,tipo_jogo,bot_token,chat_id} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(tipo_jogo, 'tipo_jogo', 'O tipo_jogo é obrigatorio');
        contract.isRequired(bot_token, 'bot_token', 'O bot_token é obrigatorio');
        contract.isRequired(chat_id, 'chat_id', 'O chat_id é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        const grupo = await Grupo.create({
            usuario_id:usuarioLogado.id,
            nome,
            tipo_jogo,
            bot_token,
            chat_id,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Grupo cadastrado com sucesso",
            data:grupo

        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},

//Fantan #############################################
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

//Futball Studio
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



//Penalty
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
        contract.isRequired(tipo, 'cofirmacao', 'O cofirmacao é obrigatorio');

        

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
 
    
             }); 
        }else{
            const msgpenalty = await MsgPenalty.create({
                bot_id: id,
                atencao,
                cofirmacao,

    
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

           
    }); 
     }else{
       const msgpenalty = await msgOld.update({
            atencao,
            cofirmacao,

           
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



async showdouble(req,res){
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


    const msgdouble = await MsgDouble.findOne({
        where: {bot_id:id},
        order: [ [ 'id', 'DESC' ]],
        });

       return res.status(201).send({
           mensagemdouble:msgdouble
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async showcrash(req,res){
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


    const msgcrash = await MsgCrash.findOne({
        where: {bot_id:id},
        order: [ [ 'id', 'DESC' ]],
        });

       return res.status(201).send({
        mensagemcrash:msgcrash
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},



async showroleta(req,res){
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


    const msgroleta = await MsgRoleta.findOne({
        where: {bot_id:id},
        order: [ [ 'id', 'DESC' ]],
        });
       
       return res.status(201).send({
        mensagemroleta:msgroleta
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},


async updatedouble(req,res){
         
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
    } = req.body;
        let contract = new ValidationContract();
        contract.isRequired(atencao, 'atencao', 'A atencao é obrigatorio');
        contract.isRequired(cofirmacao, 'cofirmacao', 'O cofirmacao é obrigatorio');
        contract.isRequired(win, 'win', 'O win é obrigatorio');
        contract.isRequired(loss, 'loss', 'O loss é obrigatorio');
        contract.isRequired(martingale, 'martingale', 'O martingale é obrigatorio');

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


        const msgOld = await MsgDouble.findOne({
            where: {bot_id:id},
            order: [ [ 'id', 'DESC' ]],
            });
 
    if(!msgOld){
        const msgdouble = await MsgDouble.create({
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
            statuscoberturabranco

        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Mensagem cadastrado com sucesso",
            data:msgdouble

        })
     
    }

   
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

    return res.status(201).json({
        msg:"Mensagem Atualizado com sucesso",
        data:msgDoubleRes

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


async updatecrash(req,res){
         
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
        confirmacao,
        win,
        loss,
        martingale,
        parcial,
        final,
        statusmartingale,
        statusparcialfinal,
    } = req.body;
        let contract = new ValidationContract();
        contract.isRequired(atencao, 'atencao', 'A atencao é obrigatorio');
        contract.isRequired(confirmacao, 'confirmacao', 'O confirmacao é obrigatorio');
        contract.isRequired(win, 'win', 'O win é obrigatorio');
        contract.isRequired(loss, 'loss', 'O loss é obrigatorio');

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


        const msgOld = await MsgCrash.findOne({
            where: {bot_id:id},
            order: [ [ 'id', 'DESC' ]],
            });
 
    if(!msgOld){
        const msgCrash = await MsgCrash.create({
            bot_id: id,
            atencao,
            confirmacao,
            win,
            loss,
            martingale,
            parcial,
            final,
            statusmartingale,
            statusparcialfinal,
        }); 
      
        return res.status(201).json({
            resolucao:true,
            msg:"Mensagem cadastrado com sucesso",
            data:msgCrash

        })
     
    }

   
    const msgCrash = await msgOld.update({
        atencao,
        confirmacao,
        win,
        loss,
        martingale,
        parcial,
        final,
        statusmartingale,
        statusparcialfinal,
        
    }); 

    return res.status(201).json({
        msg:"Mensagem Atualizado com sucesso",
        data:msgCrash

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


async updateroleta(req,res){
         
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
      
  
    const {atencao,confirmacao,win,loss,martingale,parcial,final,statusmartingale,statusparcialfinal,statuscoberturabranco} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(atencao, 'atencao', 'A atencao é obrigatorio');
        contract.isRequired(confirmacao, 'confirmacao', 'O confirmacao é obrigatorio');
        contract.isRequired(win, 'win', 'O win é obrigatorio');
        contract.isRequired(loss, 'loss', 'O loss é obrigatorio');

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


        const msgOld = await MsgRoleta.findOne({
            where: {bot_id:id},
            order: [ [ 'id', 'DESC' ]],
            });
 
    if(!msgOld){
        const msgRoleta = await MsgRoleta.create({
            bot_id: id,
            atencao,
            confirmacao,
            win,
            loss,
            martingale,
            parcial,
            final,
            statusmartingale,
            statusparcialfinal,
            statuscoberturabranco,
        }); 
      
        return res.status(201).json({
            resolucao:true,
            msg:"Mensagem Cadastrado com sucesso",
            data:msgRoleta

        })
     
    }

   
    const msgRoleta = await msgOld.update({
        atencao,
        confirmacao,
        win,
        loss,
        martingale,
        parcial,
        final,
        statusmartingale,
        statusparcialfinal,
        statuscoberturabranco,
    }); 

    return res.status(201).json({
        msg:"Mensagem Atualizado com sucesso",
        data:msgRoleta

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
   

    //CPremium Mensagem ############################################################################
    async showCPremium(req,res){
        try{
        const { id,tipo } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
                
            })
        }

        
        var grupo = await Grupo.findOne({where:{ id:id }});
       
        

        if(!grupo){
            return res.status(201).json({
                msg:'Grupo não existe',
            
            })
        }


        const mensagempremium = await MsgPremium.findOne({
            where: {bot_id:id,tipomensagem:tipo},
            order: [ [ 'id', 'DESC' ]],
            });

        return res.status(201).send({
            mensagempremium
        })
        }
        catch(err){
            return res.status(200).send({
                error:err.message
            })
        }

    },
    async updateCPremium(req,res){
            
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
            win,
            loss,
            parcial,
            final,
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
            tipo,
        } = req.body;
            let contract = new ValidationContract();
            contract.isRequired(atencao, 'atencao', 'A atencao é obrigatorio');
            contract.isRequired(win, 'win', 'O win é obrigatorio');
            contract.isRequired(loss, 'loss', 'O loss é obrigatorio');
            
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


            const msgOld = await MsgPremium.findOne({
                where: {bot_id:id,tipomensagem:tipo},
                order: [ [ 'id', 'DESC' ]],
            });
    
        if(!msgOld){
            if(tipo == 1){
                const mensagempremium = await MsgPremium.create({
                    bot_id: id,
                    abertura,
                    fechamento,
                    atencao,
                    win,
                    loss,
                    parcial,
                    final,
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
                const mensagempremium = await MsgPremium.create({
                    bot_id: id,
                    atencao,
                    win,
                    loss,
                    parcial,
                    final,
                    statusparcialfinal,
        
                }); 
            }
        

            return res.status(201).json({
                resolucao:true,
                msg:"Mensagem cadastrado com sucesso",
            

            })
        
        }

        if(tipo == 1){
             await msgOld.update({
                abertura,
                fechamento,
                atencao,
                win,
                loss,
                parcial,
                final,
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
        await msgOld.update({
            atencao,
            win,
            loss,
            parcial,
            final,
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

}

