'use strict';

var fs = require('fs');
var path = require('path');
const Grupo = require('../models/dtb_bots');
 const MsgDouble = require('../models/dtb_mensagem_double');
 const MsgCrash = require('../models/dtb_mensagem_crash');
 const MsgRoleta = require('../models/dtb_mensagem_bet365');
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");
 const pm2 = require('pm2')
module.exports = {
 
async index(req,res){
    try{
        const { id } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
       var grupo = await Grupo.findAll();
        
       grupo.forEach((elem) =>{
        console.log(elem)
        if(elem.status == "A"){
            pm2.connect(function(err) {
                if (err) {
                 console.error(err)
                 process.exit(2)
                }
               
               pm2.start({
                   name      : `${grupo.nome + grupo.id}`,
                   }, function(err, apps) {
                      console.log(err);
                   })
                  
                })
                pm2.disconnect();

        }
 
       })
        
        return res.status(201).send({
          msg:"grupos restartado",
        })
     }
     catch(err){
         return res.status(200).send({
             error:err.message
         })
     }
},




 


   
}

