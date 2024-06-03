// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.25;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IOffChainDataFetch} from "./Interface/IOffChainDataFetch.sol";
import {IResponseRequest} from "./Interface/IResponseRequest.sol";

/**
 * @title OffChainDataFetch
 * @dev Contract to fetch data off-chain
 */
abstract contract OffChainDataFetch is IOffChainDataFetch, Ownable {

  mapping(address => bool) private _authorized;

  event Request(uint256 id, address target, uint256 timestamp, string url);
  event Response(uint256 id, address target, uint8 direction);

  constructor(address initialOwner) Ownable(initialOwner) {}

  /**
   * @dev Authorize an address to response data
   * @param target The address to authorize
   */
  function authorize(address target) public onlyOwner {
    _authorized[target] = true;
  }

  /**
   * @dev Unauthorize an address to response data
   * @param target The address to unauthorize
   */
  function unauthorize(address target) public onlyOwner {
    _authorized[target] = false;
  }

  /**
   * @dev Request data from off-chain
   * @param timestamp The timestamp of the request
   * @param url The URL of the data to fetch
   * @return The ID of the request
   */
  function request(uint256 timestamp, string memory url, string memory key, string memory condition) public returns(uint256) {
    uint256 id = uint256(keccak256(abi.encodePacked(timestamp, url, key, condition))); // Generate a unique ID
    emit Request(id, msg.sender, timestamp, url);
    return id;
  }

  /**
   * @dev Response data to a request
   * @param id The ID of the request
   * @param target The address of the requester
   * @param direction The direction of the response
   */
  function response(uint256 id, address target, uint8 direction) public {
    if (!_authorized[msg.sender]) revert("OffChainDataFetch: unauthorized");
    IResponseRequest(target).fulfillRequest(id, direction);
    emit Response(id, target, direction);
  }
}