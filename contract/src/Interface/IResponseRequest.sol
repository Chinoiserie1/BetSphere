// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.25;

interface IResponseRequest {
  function fulfillRequest(uint256 id, uint8 direction) external;
}