var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("admin", { title: "Express" });
});

router.post("/setRawdealer", function(req, res, next) {
  data = req.body;
  console.log(data);
  MyContract.methods
    .setRawdealer(
      data.companyID,
      data.companyName,
      data.email,
      data.phone,
      data.companyAddress,
      data.state,
      data.place,
      data.pincode,
      data.licenceNo
    )
    .send({ from: coinbase, gas: 6000000 });
  res.send("RawDealer Registered !");
});

router.get("/getRawdealer", function(req, res, next) {
  data = req.query;
  console.log(data);
  MyContract.methods
    .getRawdealer(data.companyID)
    .call({ from: coinbase })
    .then(val => {
      console.log(val);
      res.render("rawdealer_profile", { myData: val });
    });
    });

  router.post("/setManufacturer", function(req, res, next) {
    data = req.body;
    console.log(data);
    MyContract.methods
      .setManufacturer(
        data.companyID,
        data.companyName,
        data.email,
        data.phone,
        data.companyAddress,
        data.state,
        data.place,
        data.pincode,
        data.licenceNo
      )
      .send({ from: coinbase, gas: 6000000 });
    res.send("Manufacturer Registered !");
  });

  router.get("/getManufacturer", function(req, res, next) {
    data = req.query;
    console.log(data);
    MyContract.methods
      .getManufacturer(data.companyID)
      .call({ from: coinbase })
      .then(val => {
        console.log(val);
        res.render("manufacturer_profile", { myData: val });
      
      });
});

router.post("/setSeller", function(req, res, next) {
    data = req.body;
    console.log(data);
    MyContract.methods
      .setSeller(
        data.sellerID,
        data.sellerName,
        data.email,
        data.phone,
        data.sellerAddress,
        data.state,
        data.place,
        data.pincode,
        data.licenceNo
      )
      .send({ from: coinbase, gas: 6000000 });
    res.send("Seller Registered !");
  });

  router.get("/getSeller", function(req, res, next) {
    data = req.query;
    console.log(data);
    MyContract.methods
      .getSeller(data.sellerID)
      .call({ from: coinbase })
      .then(val => {
        console.log(val);
        res.render("seller_profile", { myData: val });
      
      });
});

module.exports = router;
