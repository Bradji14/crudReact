const mysql=require('mysql')

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"empleados",
    password:""
})

module.exports=db