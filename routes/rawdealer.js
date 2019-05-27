var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('rawdealer', { title: 'Express' });
  });

router.post('/setRawMaterial', function (req, res, next) {
    data = req.body;
    console.log(data);
    MyContract.methods.setRawMaterial(data.batch, data.materialID, data.materialName, data.quantity, data.numberOfProducts, data.productName, data.companyName, data.purchaseDate, data.validtill, data.expirayDate)
        .send({ from: coinbase, gas : 6000000 });
    res.send("Raw Material Added !")
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

router.get("/getRawMaterial", function(req, res, next) {
    data = req.query;
    console.log(data);
    result = [];
    MyContract.methods
      .getLen(data.batch)
      .call()
      .then(async count => {
          console.log(count)
        for (i = 0; i < count; i++) {
          
          await MyContract.methods
            .rawMaterialsDetail(data.batch, i)
            .call()
            .then(res => {
              console.log(res);
              console.log(count);
              result.push(res);
            });
        }
        console.log(result);
        res.render("rawmaterial_view", { result, count });
      });
  });




module.exports = router;

