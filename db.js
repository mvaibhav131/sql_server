const sql = require('mssql');
require("dotenv").config();
const dbuser=process.env.USER;
const dbpassword=process.env.PASSWORD;
const server=process.env.SERVER;
const database=process.env.DATABASE;
const dbport=process.env.DBPORT;

const config = {
    user:dbuser,
    password: dbpassword,
    server: server,
    database: database,
    port:parseInt(dbport),
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        encrypt: false,
    },
};
 
const connectDB= ()=>{
      sql.connect(config, (err) => {
        if (err) {
            console.log("Error while connection the DB",err);
            return;
        }
        else{
            const request = new sql.Request();
            request.query('SELECT * from l_meter', (err, recordset) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Connected to DB");
                console.log(recordset);
                sql.close();
            });
        }
    });
};

module.exports=connectDB;


