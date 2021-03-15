const mysql = require('mysql');
let cfg = require('../config');
//cfg.read();
//console.log('ServerHost: ' + cfg.DataBaseHostAdress);
//console.log('connectionLimit: ' + cfg.connectionLimit);
//console.log('Username: ' + cfg.DataBaseUsername);

const Connectionpool = mysql.createPool({
    connectionLimit : cfg.connectionLimit,
    password: cfg.DataBasePassword,
    user: cfg.DataBaseUsername,
    database: cfg.DBTableName,
    host: cfg.DataBaseHostAdress,
    port: cfg.DataBasePort
});

let DayZMySqlDB = {};
let DayZInsert = false;

/* ADVANCED BANKING */
//!returns players bank data with plainid!
DayZMySqlDB.AdvancedBankingGetBankData = (plainID) => {
    return new Promise((resolve, reject) =>{
        Connectionpool.query(`SELECT * FROM advancedbanking WHERE steam64 = ?`, [plainID], (err, results) => {

            if(err){
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
};

//!returns clan data with id!
DayZMySqlDB.AdvancedBankingGetClanData = (clanID) => {
    return new Promise((resolve, reject) =>{
        Connectionpool.query(`SELECT * FROM advancedbankingclans WHERE ClanID = ?`, [clanID], (err, results) => {

            if(err){
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
};


DayZMySqlDB.AdvancedBankingCreateAccount = (steam64, PlayerName, amountonbank, bonusonbank, bouspaycheck, clanid) => {
        const addUserToProjectQuery = 'INSERT INTO `advancedbanking` (steam64, PlayerName, amountonbank) VALUES (?, ?, ?);';
        return new Promise((resolve, reject) =>{
        Connectionpool.query(addUserToProjectQuery, null, [steam64], [PlayerName], [amountonbank], (err, result) =>{
            if(err){
                return reject(err);
            }
            console.log(results);
            return resolve(results);
        });
    });
};


module.exports = DayZMySqlDB;