pragma solidity ^0.5.0;


contract FVS {

  //declaring state variables
  address admin;
  uint public  month = 720 hours;
  uint public currentTime = now;
  //creating contructors
  constructor() public {
    admin = msg.sender;
  }
  //creating modifier for owner only
  modifier only_owner(){
        require(msg.sender == admin);
        _;
    }
    
    
    
  //create mapping for storing the count of each batch id
  mapping(uint => uint) public NOPcount;

  //create mapping for soldorNot
  mapping(uint => uint) public soldORnot; 

  //creating structure to add the details of raw material dealers
  struct rawDealer{
    string companyName;
    string email;
    uint phone;
    string companyAddress;
    string state;
    string place;
    uint pincode;
    string licenceNo;
  }
  //create mapping for the raw material dealers using company id
  mapping(uint => rawDealer) public rawDealerDetail;

  //function to insert the raw material dealers details
  function setRawdealer(uint _companyID, string memory _companyName, string memory _email, uint _phone, string memory _companyAddress, string memory _state, string memory _place, uint _pincode, string memory _licenceNo) public only_owner returns (bool) {
    rawDealerDetail[_companyID] = rawDealer(_companyName, _email, _phone, _companyAddress, _state, _place, _pincode, _licenceNo);
  }

  //function to view the raw material dealers details
  function getRawdealer(uint _companyID) public view returns (string memory _companyName, string memory _email, uint _phone, string memory _companyAddress, string memory _state, string memory _place, uint _pincode, string memory _licenceNo){

    _companyName = rawDealerDetail[_companyID].companyName;
    _email = rawDealerDetail[_companyID].email;
    _phone = rawDealerDetail[_companyID].phone;
    _companyAddress = rawDealerDetail[_companyID].companyAddress;
    _state = rawDealerDetail[_companyID].state;
    _place = rawDealerDetail[_companyID].place;
    _pincode = rawDealerDetail[_companyID].pincode;
    _licenceNo = rawDealerDetail[_companyID].licenceNo;

  }

  //creating strcuture for the manufaturer
  struct manufacturer{

    string companyName;
    string email;
    uint phone;
    string companyAddress;
    string state;
    string place;
    uint pincode;
    string licenceNo;

  }

  //creating mapping for manufacturer
  mapping(uint => manufacturer) public manufacturerDetail;

  //function to add manufacturer details
  function setManufacturer(uint _companyID, string memory _companyName, string memory _email, uint _phone, string memory _companyAddress, string memory _state, string memory _place, uint _pincode, string memory _licenceNo) public only_owner returns (bool){
   manufacturerDetail[_companyID] = manufacturer(_companyName, _email, _phone, _companyAddress, _state, _place, _pincode, _licenceNo);

  }

  //function to view the manufacturer details
  function getManufacturer(uint _companyID) public view returns (string memory _companyName, string memory _email, uint _phone, string memory _companyAddress, string memory _state, string memory _place, uint _pincode, string memory _licenceNo){
    _companyName = manufacturerDetail[_companyID].companyName;
    _email = manufacturerDetail[_companyID].email;
    _phone = manufacturerDetail[_companyID].phone;
    _companyAddress = manufacturerDetail[_companyID].companyAddress;
    _state = manufacturerDetail[_companyID].state;
    _place = manufacturerDetail[_companyID].place;
    _pincode = manufacturerDetail[_companyID].pincode;
    _licenceNo = manufacturerDetail[_companyID].licenceNo;
  }

  //creating structure for seller
  struct seller{
    string sellerName;
    string email;
    uint phone;
    string sellerAddress;
    string state;
    string place;
    uint pincode;
    string licenceNo;

  }
  //creating mapping for seller
  mapping(uint => seller) public sellerDetail;

  //function to add the seller
  function setSeller(uint _sellerID, string memory _sellerName, string memory _email, uint _phone, string memory _sellerAddress, string memory _state, string memory _place, uint _pincode, string memory _licenceNo) public only_owner returns (bool) {
    sellerDetail[_sellerID] = seller(_sellerName, _email, _phone, _sellerAddress, _state, _place, _pincode, _licenceNo);
  }

  //function to view the seller details
  function getSeller(uint _sellerID) public view returns (string memory _sellerName, string memory _email, uint _phone, string memory _sellerAddress, string memory _state, string memory _place, uint _pincode, string memory _licenceNo){

   _sellerName = sellerDetail[_sellerID].sellerName;
    _email = sellerDetail[_sellerID].email;
    _phone = sellerDetail[_sellerID].phone;
    _sellerAddress = sellerDetail[_sellerID].sellerAddress;
    _state = sellerDetail[_sellerID].state;
    _place = sellerDetail[_sellerID].place;
    _pincode = sellerDetail[_sellerID].pincode;
    _licenceNo = sellerDetail[_sellerID].licenceNo; 
  }

  //structure to add the raw material details
  struct rawMaterial{
    uint materialID;
    string materialName;
    uint quantity;
    uint numberOfProducts;
    string productName;
    string companyName;
    uint purchaseDate;
    uint validtill;
    uint expirayDate;
  }

  //array mapping to add the rawmaterial in a batchid
  mapping(uint => rawMaterial[]) public rawMaterialsDetail;

  //function to add the raw materials to array
  function setRawMaterial(uint _batch, uint _materialID, string memory _materialName, uint _quantity, uint _numberOfProducts, string memory _productName, string memory _companyName, uint _purchaseDate, uint _validtill, uint _expirayDate) public {
        _purchaseDate = now;
        _validtill = month * _validtill;
        _expirayDate = now + _validtill;
        rawMaterialsDetail[_batch].push(rawMaterial(_materialID, _materialName, _quantity, _numberOfProducts, _productName, _companyName, _purchaseDate, _validtill, _expirayDate));
    }

  //function to get the lenght of the array of a batch
    function getLen(uint _batch) public view returns (uint _len) {
        _len = rawMaterialsDetail[_batch].length;
    }

  //structure to add the products by the manufactrer
  struct products{
    string productName;
    uint quantity;
    string companyName;
    uint MRP;
    uint expireInMonths;
    uint MFD;
    uint EXP;
    uint batch;
  }

  // array mapping to add the products
    mapping(uint => products) public productDetail;
    mapping(uint => uint[]) public batchOfproducts;
    
    // mapping(uint => mapping(uint => productDetail)) batchOfproducts;

    
    
    // creating modifier for adding products
    modifier adding_products(uint _batch){
        _;
        require (NOPcount[_batch] <= rawMaterialsDetail[_batch][0].numberOfProducts && now < rawMaterialsDetail[_batch][0].expirayDate);
        
        }
    
    uint public MAXcount;
    uint public EXPdate;

    //function to get the lenght of the array of a batchOfproducts
    function getLenOfproduct(uint _batch) public view returns (uint _len) {
        _len = batchOfproducts[_batch].length;
    }

  //function to add the products
  function setProducts(uint _productID, string memory _productName, uint _quantity, string memory _companyName, uint _MRP, uint _expireInMonths, uint _MFD, uint _EXP, uint _batch) public adding_products(_batch){
        _MFD = now;
        _expireInMonths = month * _expireInMonths;
        _EXP = now + _expireInMonths;
        
        MAXcount = rawMaterialsDetail[_batch][0].numberOfProducts;
        EXPdate = rawMaterialsDetail[_batch][0].expirayDate;
        //uint CRNTcount = NOPcount[_batch];
        //require (CRNTcount <= MAXcount && _MFD < EXPdate);
        //require (NOPcount[_batch] <= rawMaterialsDetail[_batch][0].numberOfProducts && now < rawMaterialsDetail[_batch][0].expirayDate);
        
        productDetail[_productID] = products(_productName, _quantity, _companyName, _MRP, _expireInMonths, _MFD, _EXP, _batch);
        batchOfproducts[_batch].push(_productID);
        
        NOPcount[_batch] += 1;
    }

    //structure for the billing
    struct billing{
      string shopID;
      uint purchaseDate;
      uint productID;
    }

    //mapping of billing
    mapping(uint => billing[]) public billed;

    //function to get the lenght of the array of a billed
    function getLenOfbilled(uint _billID) public view returns (uint _len) {
        _len = billed[_billID].length;
    }

    //function to insert the billing details
    function setbill(uint _billID, string memory _shopID, uint _purchaseDate, uint _productID) public{
      _purchaseDate = now;
      if(soldORnot[_productID] == 0){

        billed[_billID].push(billing(_shopID, _purchaseDate, _productID));
        soldORnot[_productID] = 1;
      }
    }
}

