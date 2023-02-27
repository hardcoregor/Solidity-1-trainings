const {ethers, run, network} = require("hardhat")

async function main() {
  const BytesFactory = await ethers.getContractFactory("Bytes")
  console.log("Deploing contract...")

  const bytes = await BytesFactory.deploy()
  await bytes.deployed()
  console.log(bytes.address)

  if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block txs....")
    await bytes.deployTransaction.wait(6)
    await verify(bytes.address, [])
  }

  const testCallBack = await bytes.testWrite(2023)
  console.log(`Value is: ${testCallBack}`)
}

async function verify(contractAddress, args) {
  console.log("Verifying contract ...")

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (error) {
    console.log(error)
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  });
