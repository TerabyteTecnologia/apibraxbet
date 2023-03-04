'use strict';

const Grupo = require('../models/dtb_bots');
 const Estrategiasaviator = require('../models/dtb_estrategia_aviator');
 const MsgAviator = require('../models/dtb_mensagem_aviator');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");
module.exports = {

//Aviator Estrategia ############################################################################
async indexaviatore(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const {id} = req.params;//bot_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const  doubles = await Estrategiasaviator.findAll({where:{bot_id:id}})

        return  res.status(200).send({
            aviators:doubles
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},


async storeaviator(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const { id } = req.params; //bod_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        const {nome,sequencia,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isInteger(parseInt(martingale), 'martingale', 'O martingale é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
          
        const double = await Estrategiasaviator.create({
            bot_id:id,
            nome,
            sequencia,
            apostar_em,
            martingale,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            duble:double

        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},

async showaviator(req,res){
    try{
       const { id,idbot } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }
       var duble = new Estrategiasaviator();
       if(usuarioLogado.permissoes.length > 0){
        duble = await Estrategiasaviator.findOne({where:{ id:id }});
       }else{
        duble = await Estrategiasaviator.findOne({
               where: {
                   [Op.and]: [
                    { bot_id: idbot},
                     { id:id }
                   ]
                 }
           });
       }
   

      
       return res.status(201).send({
        aviator:duble
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async updateaviator(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
    const {nome,sequencia,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isInteger(parseInt(martingale), 'martingale', 'O martingale é obrigatorio');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        var doubleOld = new Estrategiasaviator();
        if(usuarioLogado.permissoes.length > 0){
            doubleOld = await Estrategiasaviator.findOne({where:{ id:id }});
        }else{
            doubleOld = await Estrategiasaviator.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
 

    if(!doubleOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

   
    const duble = await doubleOld.update({
        nome,
        sequencia,
        apostar_em,
        martingale,
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        data:duble

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


async excluirAviator(req,res){
         
    try{
        const { id,idbot } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const estrategiaold = await Estrategiasaviator.findOne({
            where: {
                [Op.and]: [
                  { bot_id: idbot},
                  { id:id }
                ]
              }
    
           });

     
          if(!estrategiaold){
            return res.status(201).json({
                msg:'Estrategia não existe',
               
            })
        }



    const estrategia = await Estrategiasaviator.destroy({where:{id:estrategiaold.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Estrategia Excluida com sucesso",
        data:estrategia

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
        error:err.message
    })
}

},
async updatestatusAviator(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
    
    
        var doubleOld = new Estrategiasaviator();
        if(usuarioLogado.permissoes.length > 0){
            doubleOld = await Estrategiasaviator.findOne({where:{ id:id }});
        }else{
            doubleOld = await Estrategiasaviator.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
 

    if(!doubleOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

    const statusAtualizado = doubleOld.status =='I' ? 'A' :'I';
    const futball = await doubleOld.update({
        status:statusAtualizado.toString(),
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        data:futball

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},

//Aviator Mensagem
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
        contract.isRequired(abertura, 'abertura', 'O abertura é obrigatorio');
        contract.isRequired(fechamento, 'fechamento', 'O fechamento é obrigatorio');

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

