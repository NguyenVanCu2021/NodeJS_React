var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'product',
  password: 'chelsea21',
  port: 5432,
})

client.connect();

/* GET home page. */
router.get('/', function(req, res, next) { 
  // pool.query('SELECT NOW()', (err, res) => {
  //   console.log(err, res)
  //   pool.end()
  // })
  res.render('index', { title: 'Express' });
});

/* GET getdata */
router.get('/getdata', function(req, res, next) {

  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  // res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  
  client.query('SELECT * FROM product_info',(err, response) => {
    
    if (!err) {
      res.send(response.rows);
      
    }else {
      res.send('co loi');
      
    }
    client.end;
  })
});

router.post('/add', function(req, res, next) { 

  let product_name = req.body.product_name,
      product_price = req.body.product_price,
      product_img = req.body.product_img;

  client.query('insert into product_info (product_name,product_price, product_img) values ($1,$2,$3)',
  [product_name,product_price, product_img], (error, response) => {
    if (error) {
      res.send(error);
    }else {
      res.send('da gui du lieu thanh cong ' + product_name + product_price + product_img);
    }
  })
  
});

module.exports = router;
