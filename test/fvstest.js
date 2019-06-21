const assert = require('assert');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const json = require('./../build/contracts/copyright.json');
let accounts;
let userAddress;
let userId;
const interface = json['abi'];
const bytecode = json['bytecode'];

describe('copyright :', () => {
  beforeEach(async () => {

    accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];
    copyright = await new web3.eth.Contract(interface)
        .deploy({ data: bytecode })
        .send({ from: userAddress, gas: '4600000' });
  });
  it('register user',async() =>{
    try{
     await copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
     assert(true);
  }
  catch(err){
    assert(err);
  }

  })
  it('restrict user registration with same id', async () => {
    userAddress2=accounts[1];
    try{
     await copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
     await copyright.methods.registerUser("2","user2",userAddress2).send({ from: userAddress2, gas: '4600000' });
     assert(false);
    }
    catch(err){
      assert(true);
    }
    });
    it('user already registered',async()=>{
      await copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
      status =await copyright.methods.checkUserExists("1").call({from:userAddress});
      assert.equal(status,true,"user");
    });
    it('copyright song with unique id',async() =>{
      userAddress2=accounts[1];
      try{
        await copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
        await copyright.methods.registerUser("2","user2",userAddress2).send({ from: userAddress2, gas: '4600000' });
        await copyright.methods.registerCopyright("500","1","song1",userAddress,"hash1","500000000000000").send({ from: userAddress, gas: '4600000' });
        await copyright.methods.registerCopyright("500","1","song1",accounts[1],"hash2","500000000000000").send({ from: accounts[1], gas: '4600000' });
        assert(false,"duplicate song id");
      }
      catch(err){
        assert(err);
      }
    });
    it('copyright with unique hash',async() =>{
      userAddress2=accounts[1];
      try{
        await copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
        await copyright.methods.registerUser("2","user2",userAddress2).send({ from: userAddress2, gas: '4600000' });
        await copyright.methods.registerCopyright("500","1","song1",userAddress,"hash1","500000000000000").send({ from: userAddress, gas: '4600000' });
        await copyright.methods.registerCopyright("502","2","song1",accounts[1],"hash1","500000000000000").send({ from: accounts[1], gas: '4600000' });
        assert(false,"song exits");
      }
      catch(err){
        assert(err);
      }
    });
    it('buy license',async() =>{
      userAddress2=accounts[1]
      try {
        await copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
        await copyright.methods.registerUser("2","user2",userAddress2).send({ from: accounts[1], gas: '4600000' });
        await copyright.methods.registerCopyright("500","1","song1",userAddress,"hash1","500000000000000").send({ from: userAddress, gas: '4600000' });
        await copyright.methods.buyLicense("2","500").send({from:userAddress2,value:"500004000000000", gas:'4600000'});
      } catch (error) {
        assert(error);
      }
    });
    it('try to buy license with value less than price',async() =>{
      userAddress2 = accounts[1]
      try {
        await copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
        await copyright.methods.registerUser("2","user2",userAddress2).send({ from: accounts[1], gas: '4600000' });
        await copyright.methods.registerCopyright("500","1","song1",userAddress,"hash1","500000000000000").send({ from: userAddress, gas: '4600000' });
        await copyright.methods.buyLicense("2","500").send({from:userAddress2,value:"500004000000", gas: '4600000'});
        assert(false);
      } catch (e) {
        assert(e);
      }
    });
    it('is the song purchased or owned by user',async()=>{
      userAddress2=accounts[1];
      await copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
      await copyright.methods.registerUser("2","user2",userAddress2).send({ from: accounts[1], gas: '4600000' });
      await copyright.methods.registerCopyright("500","1","song1",userAddress,"hash1","5000000").send({ from: userAddress, gas: '4600000' });
      await copyright.methods.buyLicense("2","500").send({from:userAddress2,value:"560000000", gas: '4600000'});
      s1 = await copyright.methods.checkPurchased("1","500").call({from:userAddress});
      s2 = await copyright.methods.checkPurchased("2","500").call({from:userAddress2});
      assert.equal(s1,true,"owned by user");
      assert.equal(s2,true,"purchased by user");
    });
    it('song info',async()=>{
      await copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
      await copyright.methods.registerCopyright("500","1","song1",userAddress,"hash1","500000000000000").send({ from: userAddress, gas: '4600000' });
      song = await copyright.methods.songInfo("500").call({from:userAddress});
      assert.equal(song[0],"500");
      assert.equal(song[1],"song1");
      assert.equal(song[2],userAddress);
      assert.equal(song[3],"1");
      assert.equal(song[4],"hash1");
      assert.equal(song[5],"500000000000000");
    });
    it('get song',async()=>{
      await copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
      await copyright.methods.registerCopyright("500","1","song1",userAddress,"hash1","500000000000000").send({ from: userAddress, gas: '4600000' });
      song = await copyright.methods.getSong("500","1").call({from:userAddress});
      assert.equal(song[0],"song1");
      assert.equal(song[1],"hash1");

    })
});
