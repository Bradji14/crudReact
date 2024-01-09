const db = require("./db/db.js");
const bcrypt = require("bcrypt");

const express = require("express");
const app = express();
const cors = require("cors");

app.listen(3001, () => {
  console.log("server is running");
});

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  db.query("SELECT * FROM tb_empleados where user=?",[user],async (e, r) => {
      if (e) {
        console.log(e);
      }
      else {
        // res.send(r)
          if (r.length > 0) {
            // accede al primer elemento de los resultados devueltos por la consulta
              const hashedPassword = r[0].password;
              const match = await bcrypt.compare(pass, hashedPassword);
               return match ? res.status(200).send() : res.status(401).send()
          }
          else{
            // the data is wrong
            res.status(400).send()
          }
        }
    }
  );
});

app.post("/signin", async (req, res) => {
  try {
    const name = req.body.name;
    const user = req.body.user;
    const email = req.body.email;
    const pass = req.body.pass;
    const pashash = await bcrypt.hash(pass, 10);

    db.query(
      "INSERT INTO tb_empleados (name,user,email,password,repeatPass) VALUES (?,?,?,?,?)",
      [name,user, email, pashash, pashash],
      (e, r) => {
        if (e) {
          console.log("error al guardar", e);
        } else {
          res.send("success");
        }
      }
    );
  } catch (error) {
    // Manejar errores
    res.status(500).send("Error al guardar");
  }
});

//******************crud***************

app.get("/getproducts",(req,res)=>{
  db.query("SELECT * FROM products",(e,r)=>{
    if(e){
      console.log(e);
    }
    else{
      res.send(r)
    }
  })
})
// update
app.put("/updateproducts",(req,res)=>{
  const{id,name,description,price}=req.body
  db.query("UPDATE products SET name=?,description=?,price=? WHERE id=?",[name,description,price,id],(e,r)=>{
    return e ? console.log(e): res.status(200).send("Update success");
  })
})
// delete
app.delete("/deleteproducts",(req,res)=>{
  const id=req.body.id
 db.query("DELETE  FROM products WHERE id=?",[id],(e,r)=>{
  if(e){
    console.log(e);
  }
  else{
    res.send("Product delete succesfully")
  }
 })
})
// add
app.post("/addproducts",(req,res)=>{
  const{name,description,price}=req.body
  db.query("INSERT INTO products (name,description,price) VALUES (?,?,?)",[name,description,price],(e,r)=>{
    if(e){
      console.log(r);
    }
    else{
      res.send("product add successfully")
    }
  })
})


