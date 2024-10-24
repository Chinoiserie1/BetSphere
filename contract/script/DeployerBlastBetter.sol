// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/BetSphere.sol";
import "../src/OffChainDataFetch.sol";

contract Deployer is Script {
  OffChainDataFetch private offChainDataFetch;
  function setUp() public {}

  function run() public {
    address owner = 0x955CC6748A15Cf59577185148C21A7d278e53D71;
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    vm.startBroadcast(deployerPrivateKey);

    // Deploy OffChainDataFetch
    offChainDataFetch = new OffChainDataFetch(owner);

    // Deploy BetSphere
    new BetSphere(address(offChainDataFetch));

    vm.stopBroadcast();
  }
}
