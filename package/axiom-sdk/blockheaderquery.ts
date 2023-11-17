import {
    Axiom,
    QueryV2,
    getSlotForMapping,
    buildStorageSubquery,
    StorageSubquery,
    AxiomV2Callback,
    bytes32,
  } from "@axiom-crypto/core";
  import * as dotenv from "dotenv";
  dotenv.config();
  
  const axiom = new Axiom({
    providerUri: process.env.ETHEREUM_GOERLI_RPC_URL as string,
    privateKey: process.env.PRIVATE_KEY as string,
    version: "v2",
    chainId: 5, // Goerli
    mock: true, // generate Mock proofs for faster development
  });
  
  // !!! - this should index into deposits and find the blockheader in the struct
  const mappedSlot = getSlotForMapping(
    3, // slot of the mapping
    "address", // data type of the mapping key
    "0x1Ca793Ddf8c5B049Fb7285FB5de7aCE8b70bB5AA" // mapping key
  );
  
  // !!! -  input blockheader of after depositing
  const storageSubquery: StorageSubquery = buildStorageSubquery(10058693)
    .address("0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6")
    .slot(mappedSlot);
  
  // !!! - add address of the CCIP message sendooor
  const exampleClientAddr = "0x888d44c887DFCfaeBBf41C53eD87C0C9ED994165";
  const callback: AxiomV2Callback = {
    target: exampleClientAddr,
    extraData: bytes32(0),
  };
  const query = (axiom.query as QueryV2).new();
  query.appendDataSubquery(storageSubquery);
  query.setCallback(callback);
  
  async function main() {
    if (!(await query.validate())) {
      throw new Error("Query validation failed");
    }
    const builtQuery = await query.build();
    console.log("Query built with the following params:", builtQuery);
  
    const paymentAmt = await query.calculateFee();
    console.log(
      "Sending a Query to AxiomV2QueryMock with payment amount (wei):",
      paymentAmt
    );
  
    // 0x7414b8dc240f08f8e2ae002abf72afc299dc4b0e4ab522aeb3bf0dd9c2ccb61f
    const schemaID = query.getDataQueryHash();
    console.log(schemaID)
  
    // const queryId = await query.sendOnchainQuery(
    //   paymentAmt,
    //   (receipt: ethers.ContractTransactionReceipt) => {
    //     // You can do something here once you've received the receipt
    //     console.log("receipt", receipt);
    //   }
    // );
    // console.log(
    //   "View your Query on Axiom Explorer:",
    //   `https://explorer.axiom.xyz/v2/goerli/mock/query/${queryId}`
    // );
  }
  
  main();
  