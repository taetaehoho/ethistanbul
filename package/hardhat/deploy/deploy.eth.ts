import { HardhatRuntimeEnvironment } from "hardhat/types";
import { network, ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { sepolia, goerli } from "../constants/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId;
  console.log(chainId);

  let gatewayargs: any = [];

  if (chainId == 11155111) {
    gatewayargs = [1, 2, 3];
  } else if (chainId == 5) {
    gatewayargs = [
      goerli.world_address,
      goerli.world_app_id,
      goerli.world_action_id,
    ];
  }

  const gateway = await deploy("Gateway", {
    from: deployer,
    args: gatewayargs,
    log: true,
    autoMine: true,
  });

  console.log(`Gateway deployed at ${gateway.address}`)

  let msgsenderarg: any = [];

  if (chainId == 11155111) {
    msgsenderarg = [1, 2, 3];
  } else if (chainId == 5) {
    msgsenderarg = [goerli.ccip_router, ethers.constants.AddressZero, 
                    goerli.axiomV2QueryAddress, goerli.HyperlaneOutbox,
                    goerli.axiomCallbackQuerySchema, goerli.gateway_deployment, 5];
  }

  const msgsender = await deploy('MsgSender', {
    from: deployer,
    args: msgsenderarg,
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });

  console.log(`Msgsender deployed at ${msgsender.address}`)

  console.log('Verifying Gateway.... ')
  await hre.run("verify:verify", {
    address: gateway.address,
    constructorArguments: gatewayargs,
  });

  console.log('Verifying Msgsender.... ')
  await hre.run("verify:verify", {
    address: msgsender.address,
    constructorArguments: msgsenderarg,
  });

};
export default func;
func.tags = ["deployeth"];
