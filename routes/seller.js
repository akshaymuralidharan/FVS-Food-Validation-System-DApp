var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("seller", { title: "Express" });
});

router.post("/setbill", function(req, res, next) {
  data = req.body;
  console.log(data);
  MyContract.methods
    .setbill(data.billID, data.shopID, data.purchaseDate, data.productID)
    .send({ from: coinbase, gas: 6000000 })
    .then(val => {
      console.log("value from contract :",val);
      if (val.status) {
        res.send("Producted added to billed !");
      } else res.send("Product already added or expired cannot be sold !");
    }).catch(function(e) {
        console.log(e);
        res.send("Product already added or expired cannot be sold !"); // This is never called
      });
});

module.exports = router;
