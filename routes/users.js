var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Express' });
});

router.get('/productDetail', function (req, res, next) {
    data = req.query;
    console.log(data.productID);

    MyContract.methods.productDetail(data.productID)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
            res.render('product_view', {myData : val});
        }).catch(function(e) {
          console.log(e); // This is never called
        });
});

module.exports = router;
