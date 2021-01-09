const express = require("express")
const mysql = require('mysql')

// CREATE connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'produitcategorie'
});
// CONNECT
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('MYSQL connected.....')
});

const router = express.Router()


//products
//show all products
router.get('/', (req, res) => {
    const sql = "SELECT * FROM produit";
    // const  sql1 = ' SELECT * FROM categorie';
    const query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.render("home", {
            produits: result
           
        })
        res.end()
    });
    
});

// get by category
// router.get('/Search/:cat', (req, res) => {
//   //  var quotes;
//    // console.log(req.params.char)
//     let cat = req.params.char
//     let sql = `SELECT * FROM produit WHERE catProd =  "${cat}%"` 
//      db.query(sql, (err, result, fields) => { 
//         console.log(result)
//         res.end()
//     });
// });


// ++++++++++ CRUD Product +++++++++++
// Create and save product 
router.get('/addproduit',(req, res) => {
    res.render('addProduct');
});

router.post('/saveProduit', (req, res) => {
    const data = {
        NomProd : req.body.NomProd,
        prix : req.body.prix,
        catProd: req.body.catProd
    };
    const sql = "INSERT INTO produit SET ?"
    const query = db.query(sql, data, (err, result) => {
        if(err) throw err;
        res.redirect("/")
    });
});


// delete product by id
router.get('/deleteProduit/:id', (req, res) => {
    let sql = `DELETE FROM produit WHERE idProd = "${req.params.id}"`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/')
    })
})
// update product by id
router.get('/editProduit/:id', (req, res) => {
    const productId = req.params.id
    const sql = `Select * from produit where idProd = ${productId}`;
    const query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.render('editProduct', {
            produit : result[0]
        })
    })
})
router.post('/updateProduit/:id', (req, res) => {
    const  newproduit = req.body;
    var id = req.params.id;
     let sql = `UPDATE produit SET NomProd = "${newproduit.NomProd}", prix = '${newproduit.prix}', catProd = '${newproduit.catProd}' WHERE idProd = ${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/')
    })
   
})


// ++++++++++++ categories ++++++++++++++++
//show  all 
router.get('/category', (req, res) => {
    const  sql = ' SELECT * FROM categorie';
    const query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.render("categories", {
            categories: result
        })
        res.end()
    });
});
// Create Category by id
router.get("/category/addCategory", (req, res) => {
    res.render("addCategory")
})
router.post('/category/saveCategory', (req, res) => {
    const data = {
        nameCat : req.body.nameCat
    }
    let sql = "INSERT INTO categorie SET ?";
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        res.redirect('/category')
        console.log(data)
        res.end();
    })

});
// delete
router.get('/category/deletecategory/:id', (req, res) => {
    console.log(req.params.id)
    let sql = `DELETE FROM categorie WHERE idCAt = "${req.params.id}"`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/category')
    })
})
// update 

router.get('/category/editCategory/:id', (req, res) => {
    const idCAt = req.params.id
    const sql = `Select * from categorie where idCAt = ${idCAt}`;
    const query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.render('editCategory', {
            category : result[0]
        })
    })
})

router.post('/category/updatecategory/:id', (req, res) => {
    var newcategory = req.body;
    var id = req.params.id;
    let sql = `UPDATE categorie SET nameCat = '${newcategory.nameCat}' WHERE idCat = ${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/category')
    })
})

module.exports = router