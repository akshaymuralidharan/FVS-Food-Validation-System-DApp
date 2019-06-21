var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('manufacturer', { title: 'Express' });
  });

router.post('/setProducts', function (req, res, next) {
    data = req.body;
    console.log(data);
    MyContract.methods.setProducts(data.productID, data.productName, data.quantity, data.quantity, data.MRP, data.expireInMonths, data.MFD, data.EXP, data.batch)
        .send({ from: coinbase, gas : 6000000 });
    
    res.send("Product Added !")
});



// router.get('/getRawMaterial', function (req, res, next) {
//     data = req.query;
//     console.log(data);
//     MyContract.methods.getLen(data.batch)
//         .call({ from: coinbase }).then((val) => {
//             console.log(val);
//         })
//          count = val; 
//          result = [];

//     MyContract.methods.rawMaterialsDetail(data.batch, len)
//         .call({ from: coinbase }).then((val) => {
//             console.log(val1);
//             res.render("rawmaterial_view", {myData : val1, len});
//         })
// });

router.get("/batchOfproducts", function(req, res, next) {
    data = req.query;
    console.log(data);
    result = [];
    MyContract.methods
      .getLenOfproduct(data.batch)
      .call()
      .then(async count => {
          console.log(count)
        for (i = 0; i < count; i++) {
          
          await MyContract.methods
            .batchOfproducts(data.batch, i)
            .call()
            .then(res1 => {
              console.log(res);
              console.log(count);
              result.push(res1);
            }).catch(function(e) {
              console.log(e); // This is never called
            });
        }
        console.log(result);
        res.render('productBatchview', { result, count });
      }).catch(function(e) {
        console.log(e); // This is never called
      });
  });




module.exports = router;

