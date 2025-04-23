const mysql = require('mysql2');
const db = mysql.createconnection({

    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'devbook'
});

db.connection((err) => {

    if(err){
        console.log('failed connection :', err);
    }else{
        console.log('cennected succufly');
    }
});

module.exports = db ;