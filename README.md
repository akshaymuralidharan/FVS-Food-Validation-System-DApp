# FVS-Food Validation System DAPP

Food Validation System using Ethereum BlockChain

# **Food Validation System**

# **Brief Description**
In today's world there are lot of corruption in food production and sales. Flow of a food item in a market starts from raw material dealers to users through manufactures and sellers. In order to avoid peoples to get fooled by non-quality food items and product which are outdated we introduce Food validation System. Admin is the authorized party which add raw material dealer, manufacturer and seller. Raw material dealer add raw materials which are further used by manufactures for making new product. Material purchased at a time e is grouped as batch, which means batch can have multiple materials. Raw dealer specifies maximum count of product produced by manufacturer with current batch. So that manufacturer cannot add product in different ways as number is already specified.  Expiry date of product is added in a way that outdated product cannot be billed. Duplication of product id is popular and perhaps may not be found. Food validation system keeps unique product id and recurrent item cannot be billed. Food validation system ensures is the product is coming from an authorized dealer and expiry date of the product is not outdated. User of this network can view the details of product by using unique product id

# **Installation prerequisites**

1. Ensure that NodeJS is installed in the system. For more information about NodeJS, go to NodeJS website [ https://nodejs.org ].
   To check if NodeJs is installed, open a terminal window, run following command:

   `$ node -v`

2. If NodeJS is not installed, go to [ https://nodejs.org ] and download the compatible version based on your operating system.
   To install through a terminal window, run following command:

   `$ sudo apt-get install -y nodejs`

3. Ensure that Truffle is installed. Truffle Suite helps to develop Dapps easily. For more information, go to [ https://truffleframework.com/ ].
   To check if Truffle is installed, run following command in the terminal window:

   `$ truffle version`

4. If Truffle is not installed, run following command in the terminal window:

   `$ npm install -g truffle`


5. Ensure that Geth is installed. Geth is the official Golang implementation of the Ethereum protocol.
   To check if Geth is installed, run following command in the terminal window:

   `$ geth version`

6. To install Geth, run following command in the terminal window:

   `$ sudo apt-get install software-properties-common`
   `$ sudo add-apt-repository -y ppa:ethereum/ethereum`
   `$ sudo apt-get update`
   `$ sudo apt-get install ethereum`

7. Ensure that Go and C compilers are installed. To check if Go and C are installed, run following command in the terminal window:

   `$ sudo apt-get install -y build-essential`

8. Run Geth

    `$ geth --identity "miner" --networkid 4002 --datadir  dev --rpc --rpcport "8545" --unlock 0 --ipcpath "~/.ethereum/geth.ipc" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --dev`

9. download "FVS-Food-Validation-System" and open in another terminal

10. Before running truffle migrate delete the 'build' folder from the project and run truffle migrate.

    `$ truffle compile`

    `$ truffle migrate`

11. run application

    `$ npm start`

12. Go to..... `http://localhost:3000`
13. Now you can access the UI part of the Dapp.



------------------------------------
14. Add Raw material dealer
   eg:
    companyID: 1001 // id of rawmaterail dealer
    companyName: Fissai // authorized delaer name
    email:fissai@gmail.com
    phone:987456
    companyAddress:Mavoor
    state:Kerala
    place:Calicut
    pincode:1236
    licenceNo:MNB123// licence number

15. View Raw material Dealer
    eg:
    companyID: 1001 // display details of raw material dealer

16. Add Manufacturer
    eg:
    companyID:123 // id of manufacturer
    companyName: Nestle // Manufacturer name
    email: nestle @gmail.com
    phone:4569872
    companyAddress:chembavoor // address of Manufacturer
    state:Kerala
    place:Palakkad
    pincode:1235
    licenceNo:ERT345 // licence number of Manufacturer

17. view Manufacturer
    eg:
    companyID: 123 //  display details of Manufacturer

18. Add seller
    eg:
    sellerID: 321 // id of Seller
    sellerName: Bigfresh // name of seller who sale the product
    email: bigfresh@gmail.com
    phone:45698789
    sellerAddress: maathar // addreee of seller
    state: Kerala
    place: Kannur
    pincode: 46987
    licenceNo:BNM456

19. view seller
    eg:
    sellerId: 321 // display details of Seller

20. Add Raw material(by Raw material dealer)
    eg:
    batch: 1001 //raw materials are added to a batch 
    materialID: 101 // unique identifier for raw materials
    materialName: Wheat
    quantity:100 // total quandity of each material
    numberOfProducts:10 // maximum count of product that can be produced by manufacture in a specified batch
    productName: Noodles // name of the product
    companyName: Nestle // name of manufacture
    validtill: 6 //expiry in months
    
21. Add Product(by Manufacturer)
    eg:
    productID:001 // unique identifier for a product
    productName: Noodles 
    quantity: 10 // quandity of each product
    companyName: Nestle // manufacture name
    MRP:15 // price of each product
    expireInMonths: 6 // validity in months
    batch: 1001 // batch for the material

22. set bill(by Seller)
    eg:
    billID: 9001 // unique id for each bill
    shopID: 321 // seller id
    productID: 001 // id of product to be billed

23. USER
    User can view details of product by productID
    eg:
    productID: 001 // displays the details of product

24. Note: Check the UI flow chart to follow the steps to be taken while using UI.



