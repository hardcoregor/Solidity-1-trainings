const { assert, expect } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");

describe("OurToken", async function () {
  let token, deployer, user1, user2, user3;
  const chainId = network.config.chainId;

  beforeEach(async function () {
    await deployments.fixture("all");
    [deployer, user1, user2, user3] = await ethers.getSigners()
    // deployer = (await getNamedAccounts()).deployer;
    // user1 = (await getNamedAccounts()).user1;
    // user2 = (await getNamedAccounts()).user2;
    token = await ethers.getContract("OurToken", deployer);
  });

  it("check initial supply", async function () {
    const tx = await token.totalSupply();
    assert.equal(tx.toString(), "1000000000000000000000000");
  });

  it("correct name token", async function () {
    const tx = await token.name();
    assert.equal(tx, "OurToken");
  });

  it("correct symbol", async () => {
    const tx = await token.symbol();
    assert.equal(tx, "OT");
  });

  describe("Check functions", () => {
    let endingBalanceUser1, endingBalanceUser2
    const transferAmount = ethers.utils.parseUnits("3", "ether")

    it("correct balanceOf", async function () {
      const balanceOwner = await token.balanceOf(deployer.address);
      const totalSupply = await token.totalSupply();
      assert.equal(balanceOwner.toString(), totalSupply.toString());
    });

    it("checking balance after transfer from deployer to user1", async () => {
      const transferTx = await token.transfer(user1.address, transferAmount);

      const endingBalanceUser = await token.balanceOf(user1.address);

      assert.equal(endingBalanceUser.toString(), transferAmount.toString());
    });

    it("check transfer from deployer to user1 and from user1 to user2", async () => {
      const transferAmountSmaller = ethers.utils.parseUnits("2", "ether");
      const reminderBalance = ethers.utils.parseUnits("1", "ether");

      //FROM DEPLOYER TO USER1
      const transferTx = await token.transfer(user1.address, transferAmount);
      endingBalanceUser1 = await token.balanceOf(user1.address);
      assert.equal(endingBalanceUser1.toString(), transferAmount.toString());

      //FROM USER1 TO USER2
      const transferTx2 = await token.connect(user1).transfer(user2.address, transferAmountSmaller);
      endingBalanceUser1 = await token.balanceOf(user1.address);
      endingBalanceUser2 = await token.balanceOf(user2.address);
      assert.equal(endingBalanceUser1.toString(), reminderBalance.toString());
      assert.equal(endingBalanceUser2.toString(), transferAmountSmaller.toString());
    });

    it("chech allowance from user1 to user2", async() => {
      const allowanceTx = await token.connect(user1).allowance(user1.address, user2.address)
      assert.equal(allowanceTx, 0)
    })

    it("chech approve from user1 to user2", async() => {
      await token.transfer(user1.address, transferAmount)

      const txApprove = await token.connect(user1).approve(user2.address, transferAmount)
      const txAllowance = await token.allowance(user1.address, user2.address)
      assert.equal(txAllowance.toString(), transferAmount.toString())
    })

    it("transferFrom user1 to user3", async() => {
      await token.transfer(user1.address, transferAmount)
      const txApprove = await token.connect(user1).approve(user2.address, transferAmount)
      const txTransferFrom = await token.connect(user2).transferFrom(user1.address, user3.address, transferAmount)

      const balanceUser1 = await token.balanceOf(user1.address);
      const balanceUser3 = await token.balanceOf(user3.address);

      assert.equal(balanceUser1, 0)
      assert.equal(balanceUser3.toString(), transferAmount.toString())
    })

    it("increaseAllowance", async() => {
      const increaseAmount = ethers.utils.parseUnits("2", "ether")

      await token.transfer(user1.address, transferAmount)
      const txApprove = await token.connect(user1).approve(user2.address, transferAmount)
      let txAllowance = await token.allowance(user1.address, user2.address)
      assert.equal(txAllowance.toString(), transferAmount.toString())

      await token.transfer(user1.address, increaseAmount)
      const increase = await token.connect(user1).increaseAllowance(user2.address, increaseAmount)
      txAllowance = await token.allowance(user1.address, user2.address)
      const endingAllowance = (+transferAmount) + (+increaseAmount)
      assert.equal(txAllowance.toString(), endingAllowance.toString())
    })
  
  });
});
