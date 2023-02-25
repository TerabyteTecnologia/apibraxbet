'use strict';

const Grupo = require('../models/dtb_bots');
const TipoJogo = require('../models/dtb_tipojogo');

 const EstrategiaPenalty = require('../models/dtb_estrategia_penalty');

 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");
module.exports = {
 




//penalty  ############################################################################

async showPenalty(req,res){
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
            msg:'Jog não existe',
           
        })
       }

       
    const penalty = await EstrategiaPenalty.findOne({
        where: {bot_id:id},
        order: [ [ 'id', 'DESC' ]],
        });

       return res.status(201).send({
          penalty
       })

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async updatepenalty(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id } = req.params;
        const {esperar,tentativa} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(esperar, 'esperar', 'A espera é obrigatorio');
        contract.isRequired(tentativa, 'tentativa', 'A tentativa a é obrigatorio');

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
        const penaltyOld = await EstrategiaPenalty.findOne({
            where: {bot_id:id},
            order: [ [ 'id', 'DESC' ]],
            });
 
    
            if(!penaltyOld){
                const penaltyCrash = await EstrategiaPenalty.create({
                    bot_id: id,
                    esperar,
                    tentativa
                }); 
                return res.status(201).json({
                    resolucao:true,
                    msg:"Penalty cadastrado com sucesso",
                    data:penaltyCrash
        
                })
            }

            
   
    const penalty = await penaltyOld.update({
        esperar,
        tentativa
    }); 

    return res.status(201).json({
        msg:"Penalty Atualizado com sucesso",
        crash:penalty

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},





}

