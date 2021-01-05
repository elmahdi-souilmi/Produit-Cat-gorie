const express = require('express')
const app = express()
const mysql = require('mysql')
const port = 2021

// CREATE connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'produitcategorie'
});
// CONNECT
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('MYSQL connected.....')
});

// make you read the body req
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
//to read file from the pubic foldern
app.use(express.static("public"));
//to not use .ejs everytime
app.set("view engine", "ejs");
//products
//show all products
app.get('/produit', (req, res) => {
    var produit
    let sql = 'SELECT * FROM produit';
    db.query(sql, (err, result) => {
        if (err) throw err;
        produit = result;
        res.render("home", {
            produits: produit
        })
        res.end()
    });
});

// get by category
// app.get('/Search/:cat', (req, res) => {
//   //  var quotes;
//    // console.log(req.params.char)
//     let cat = req.params.char
//     let sql = `SELECT * FROM produit WHERE catProd =  "${cat}%"` 
//      db.query(sql, (err, result, fields) => { 
//         console.log(result)
//         res.end()
//     });
// });

// create
app.post('/addproduit', (req, res) => {
    var newproduit = req.body;
    let sql = ' INSERT INTO `produit` (`idProd`, `NomProd`, `prix`, `catProd`) VALUES   ?';
    db.query(sql, newproduit, (err, result) => {
        if (err) throw err;
        res.redirect('/home')
        console.log(newproduit)
        res.end();
    })

});
// delete
app.get('/deleteproduit/:id', (req, res) => {
    console.log(req.params.id)
    let sql = `DELETE FROM produit WHERE idProd = "${req.params.id}"`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/home')
    })
})
// update 
app.post('/updateproduit/:id', (req, res) => {
    var newproduit = req.body;
    var id = req.params.id;
    let sql = `UPDATE produit SET NomProd = "${newproduit.NomProd}", prix = '${newproduit.prix}', catProd = '${newproduit.catProd}' WHERE idProd = ${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/home')
    })
})
// categories
//show  all 
app.get('/categories', (req, res) => {
    var categorie
    let sql = ' SELECT * FROM categorie';
    db.query(sql, (err, result) => {
        if (err) throw err;
        categorie = result;
        res.render("home", {
            categories: categorie
        })
        res.end()
    });
});
// create
app.post('/addcategory', (req, res) => {
    var newCat = req.body;
    let sql = ' INSERT INTO `categorie` (`idCAt`, `nameCat`) VALUES   ?';
    db.query(sql, newCat, (err, result) => {
        if (err) throw err;
        res.redirect('/home')
        console.log(newCat)
        res.end();
    })

});
// delete
app.get('/deletecategory/:id', (req, res) => {
    console.log(req.params.id)
    let sql = `DELETE FROM categorie WHERE idCAt = "${req.params.id}"`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/home')
    })
})
// update 
app.post('/updatecategory/:id', (req, res) => {
    var newcategory = req.body;
    var id = req.params.id;
    let sql = `UPDATE produit SET  nameCat = '${newcategory.nameCat}' WHERE idCat = ${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/home')
    })
})

app.listen(port, () => console.log(` app listening on port 2021!`))