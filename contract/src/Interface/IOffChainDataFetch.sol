// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.25;

interface IOffChainDataFetch {
  function request(
    uint256 verificationTimestamp,
    string memory url,
    string[] memory params,
    string[] memory keys,
    string memory condition
  ) external returns(uint256);

  function requestAutomatic(
    uint256 verificationTimestamp,
    string memory url,
    string[] memory params,
    string[] memory keys,
    string memory condition
  ) external returns(uint256);

  function response(uint256 id, bytes memory value) external;
}