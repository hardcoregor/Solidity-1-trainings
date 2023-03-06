const { assert } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("BasicNft unit tests", () => {
      let deployer, basicNft

      beforeEach(async() => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture(["basicNft"])
        basicNft = await ethers.getContract("BasicNft")
      })

      describe("Correct initializes Constructor", () => {
        it("All initializes correct", async() => {
          const getName = await basicNft.name()
          const getSymbol = await basicNft.symbol()
          const getCounter = await basicNft.getTokenCounter()

          assert.equal(getName, "Dogie")
          assert.equal(getSymbol, "DOG")
          assert.equal(getCounter.toString(), "0")
        })

        it("Correct tokenURI", async() => {
          const URI = "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

          const getURI = await basicNft.tokenURI(0)
          assert.equal(getURI, URI)
        })
      })

      describe("Minting", () => {
        it("Successful Mint", async() => {
          let getCounter;
          const startingBalance = await basicNft.balanceOf(deployer.address)
          assert.equal(startingBalance.toString(), "0")

          await basicNft.mintNft()
          const endingBalance = await basicNft.balanceOf(deployer.address)
          assert.equal(endingBalance.toString(), "1")

          getCounter = await basicNft.getTokenCounter()
          assert.equal(getCounter.toString(), "1")

          await basicNft.mintNft()

          getCounter = await basicNft.getTokenCounter()
          assert.equal(getCounter.toString(), "2")
        })

        it("test CallStatic", async() => {
          await basicNft.mintNft()
          const callStatic = await basicNft.callStatic.getTokenCounter()
          console.log(callStatic.toString())
        })
      })

    })
