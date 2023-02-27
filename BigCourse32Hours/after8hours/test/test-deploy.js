const {ethers} = require("hardhat")
const {expect, assert} = require("chai")

describe("Bytes", () => {
  let bytesFactory, bytesContract

  beforeEach(async() => {
    bytesFactory = await ethers.getContractFactory("Bytes")
    bytesContract = await bytesFactory.deploy()
  })

  it("Should start with a hero = 0", async() => {
    const heroValue = await bytesContract.testWrite(5);
    const expectedValue = "5"
    assert.equal(heroValue.toString(), expectedValue)
  })

  it("Should update value", async() => {
    const expectedValue = "1999"
    const tx = await bytesContract.changeHero(1999)
    await tx.wait(1)

    const currentValue = await bytesContract.hero();

    assert.equal(currentValue.toString(), expectedValue)
  })
})