const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //     encryptedJson,
    //     process.env.PRIVATE_KEY_PASSWORD
    // )
    // wallet = await wallet.connect(provider)

    const abi = fs.readFileSync(
        "./artifacts/BigCourse32Hours_Bytes_sol_Bytes.abi",
        "utf8"
    )
    const binary = fs.readFileSync(
        "./artifacts/BigCourse32Hours_Bytes_sol_Bytes.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log('deploying');
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)
    console.log(contract.address)

    // console.log("deploy only tx data");
    // const nonce = await wallet.getTransactionCount();
    // const tx = {
    //   nonce: nonce,
    //   gasPrice: 20000000000,
    //   gasLimit: 1000000,
    //   to: null,
    //   value: 0,
    //   data: "0x608060405234801561001057600080fd5b50610d0d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80637049e0871461003b578063e5c5e9a31461006b575b600080fd5b6100556004803603810190610050919061027e565b61009e565b60405161006291906103b2565b60405180910390f35b61008560048036038101906100809190610504565b6100d3565b604051610095949392919061073f565b60405180910390f35b606085858585856040516020016100b9959493929190610905565b604051602081830303815290604052905095945050505050565b60008060606100e061010b565b848060200190518101906100f49190610c38565b809450819550829650839750505050509193509193565b60405180604001604052806060815260200161012561012b565b81525090565b6040518060400160405280600290602082028036833780820191505090505090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61017481610161565b811461017f57600080fd5b50565b6000813590506101918161016b565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006101c282610197565b9050919050565b6101d2816101b7565b81146101dd57600080fd5b50565b6000813590506101ef816101c9565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261021a576102196101f5565b5b8235905067ffffffffffffffff811115610237576102366101fa565b5b602083019150836020820283011115610253576102526101ff565b5b9250929050565b600080fd5b6000606082840312156102755761027461025a565b5b81905092915050565b60008060008060006080868803121561029a57610299610157565b5b60006102a888828901610182565b95505060206102b9888289016101e0565b945050604086013567ffffffffffffffff8111156102da576102d961015c565b5b6102e688828901610204565b9350935050606086013567ffffffffffffffff8111156103095761030861015c565b5b6103158882890161025f565b9150509295509295909350565b600081519050919050565b600082825260208201905092915050565b60005b8381101561035c578082015181840152602081019050610341565b60008484015250505050565b6000601f19601f8301169050919050565b600061038482610322565b61038e818561032d565b935061039e81856020860161033e565b6103a781610368565b840191505092915050565b600060208201905081810360008301526103cc8184610379565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61041182610368565b810181811067ffffffffffffffff821117156104305761042f6103d9565b5b80604052505050565b600061044361014d565b905061044f8282610408565b919050565b600067ffffffffffffffff82111561046f5761046e6103d9565b5b61047882610368565b9050602081019050919050565b82818337600083830152505050565b60006104a76104a284610454565b610439565b9050828152602081018484840111156104c3576104c26103d4565b5b6104ce848285610485565b509392505050565b600082601f8301126104eb576104ea6101f5565b5b81356104fb848260208601610494565b91505092915050565b60006020828403121561051a57610519610157565b5b600082013567ffffffffffffffff8111156105385761053761015c565b5b610544848285016104d6565b91505092915050565b61055681610161565b82525050565b610565816101b7565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6105a081610161565b82525050565b60006105b28383610597565b60208301905092915050565b6000602082019050919050565b60006105d68261056b565b6105e08185610576565b93506105eb83610587565b8060005b8381101561061c57815161060388826105a6565b975061060e836105be565b9250506001810190506105ef565b5085935050505092915050565b600081519050919050565b600082825260208201905092915050565b600061065082610629565b61065a8185610634565b935061066a81856020860161033e565b61067381610368565b840191505092915050565b600060029050919050565b600081905092915050565b6000819050919050565b6000602082019050919050565b6106b48161067e565b6106be8184610689565b92506106c982610694565b8060005b838110156106fa5781516106e187826105a6565b96506106ec8361069e565b9250506001810190506106cd565b505050505050565b6000606083016000830151848203600086015261071f8282610645565b915050602083015161073460208601826106ab565b508091505092915050565b6000608082019050610754600083018761054d565b610761602083018661055c565b818103604083015261077381856105cb565b905081810360608301526107878184610702565b905095945050505050565b600080fd5b82818337505050565b60006107ac8385610576565b93507f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8311156107df576107de610792565b5b6020830292506107f0838584610797565b82840190509392505050565b600080fd5b600080fd5b600080fd5b6000808335600160200384360303811261082857610827610806565b5b83810192508235915060208301925067ffffffffffffffff8211156108505761084f6107fc565b5b60018202360383131561086657610865610801565b5b509250929050565b600061087a8385610634565b9350610887838584610485565b61089083610368565b840190509392505050565b600082905092915050565b6108b260408383610797565b5050565b6000606083016108c9600084018461080b565b85830360008701526108dc83828461086e565b925050506108ed602084018461089b565b6108fa60208601826108a6565b508091505092915050565b600060808201905061091a600083018861054d565b610927602083018761055c565b818103604083015261093a8185876107a0565b9050818103606083015261094e81846108b6565b90509695505050505050565b6000815190506109698161016b565b92915050565b600061097a82610197565b9050919050565b61098a8161096f565b811461099557600080fd5b50565b6000815190506109a781610981565b92915050565b600067ffffffffffffffff8211156109c8576109c76103d9565b5b602082029050602081019050919050565b60006109ec6109e7846109ad565b610439565b90508083825260208201905060208402830185811115610a0f57610a0e6101ff565b5b835b81811015610a385780610a24888261095a565b845260208401935050602081019050610a11565b5050509392505050565b600082601f830112610a5757610a566101f5565b5b8151610a678482602086016109d9565b91505092915050565b600080fd5b600080fd5b600067ffffffffffffffff821115610a9557610a946103d9565b5b610a9e82610368565b9050602081019050919050565b6000610abe610ab984610a7a565b610439565b905082815260208101848484011115610ada57610ad96103d4565b5b610ae584828561033e565b509392505050565b600082601f830112610b0257610b016101f5565b5b8151610b12848260208601610aab565b91505092915050565b600067ffffffffffffffff821115610b3657610b356103d9565b5b602082029050919050565b6000610b54610b4f84610b1b565b610439565b90508060208402830185811115610b6e57610b6d6101ff565b5b835b81811015610b975780610b83888261095a565b845260208401935050602081019050610b70565b5050509392505050565b600082601f830112610bb657610bb56101f5565b5b6002610bc3848285610b41565b91505092915050565b600060608284031215610be257610be1610a70565b5b610bec6040610439565b9050600082015167ffffffffffffffff811115610c0c57610c0b610a75565b5b610c1884828501610aed565b6000830152506020610c2c84828501610ba1565b60208301525092915050565b60008060008060808587031215610c5257610c51610157565b5b6000610c608782880161095a565b9450506020610c7187828801610998565b935050604085015167ffffffffffffffff811115610c9257610c9161015c565b5b610c9e87828801610a42565b925050606085015167ffffffffffffffff811115610cbf57610cbe61015c565b5b610ccb87828801610bcc565b9150509295919450925056fea2646970667358221220eb55a82c7eb5f36c30ea76fb8ae1a57b85fb3c2fd94973f9f39febc1fc5d6a2a64736f6c63430008130033",
    //   chainId: 1337,
    // }

    // // const signedTxResponse = await wallet.signTransaction(tx);
    // const sentdTxResponse = await wallet.sendTransaction(tx);
    // await sentdTxResponse.wait(1);
    // console.log(sentdTxResponse);

    // const callFunctionTest = await contract.test()

    // const changeHero = await contract.changeHero("55")
    // const callReceipt = await changeHero.wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
