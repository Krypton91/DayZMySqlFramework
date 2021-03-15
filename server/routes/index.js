const { json } = require('express');
const express = require('express');
const cfg = require('../config');
const db = require('../db');
const router = express.Router();

/*
router.get('/', async (req, res, next) => {

    try  {
        let results =  await db.all();
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
*/

router.post('/:auth', async (req, res, next) => {

    try  {
        if(req.params.auth == cfg.ServerAuthKey) {
            //console.log('Params from request: ' + req.params.auth);
            await Execute(req, res)
            //let results =  await db.byUID(req.params.uid);
            //res.json(results);
        }else{
            //res.sendStatus(500);
            res.json({status: "Not Authorized"});
        }
    }catch(e){

        console.log(e);
        res.sendStatus(500);
    }
});

async function Execute(req, res){
    var ReqRawData = req.body;
   console.log(JSON.stringify(ReqRawData));
    //var query = JSON.parse(ReqRawData);
    try{
        var result;
        if(ReqRawData.ModName == 'advancedbanking')
        {
            if(ReqRawData.QueryKey == 'bankdata')
            {
                result = await db.AdvancedBankingGetBankData(ReqRawData.SearchTerm);
            }

            else if(ReqRawData.QueryKey == 'clandata')
            {
                result = await db.AdvancedBankingGetClanData(ReqRawData.SearchTerm);
            }

            else if(ReqRawData.QueryKey == 'CreateNewAccount')
            {
                //steam64, PlayerName, amountonbank, bonusonbank, bouspaycheck, clanid
                result = await db.AdvancedBankingCreateAccount(ReqRawData.steam64id, ReqRawData.playername, ReqRawData.amountonbank, ReqRawData.bonusamount, ReqRawData.bonuspaycheck, ReqRawData.clanid);
            }
        }
        res.json(result);
    }catch(e){
        console.log("Error in Query: " + JSON.stringify(ReqRawData) + e);
        //res.sendStatus(500);
    }
}

module.exports = router;