// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.25;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IOffChainDataFetch} from "./Interface/IOffChainDataFetch.sol";
import {IResponseRequest} from "./Interface/IResponseRequest.sol";
import {OffChainDataFetchErrors} from "./Interface/error/OffChainDataFetchErrors.sol";


/**
 * @title OffChainDataFetch
 * @dev Contract to fetch data off-chain
 */
contract OffChainDataFetch is Ownable {

  mapping(address => bool) private _authorized;
  mapping(address => bool) private _authorizedRequester;

  event Request(
    uint256 timestamp,
    uint256 indexed id,
    address indexed target,
    string url,
    string[] params,
    string[] keys,
    string condition
  );
  event RequestAutomatic(
    uint256 timestamp,
    uint256 indexed id,
    address indexed target,
    string url,
    string[] params,
    string[] keys,
    string condition
  );
  event Response(uint256 id, address target, uint8 direction);

  constructor(address initialOwner) Ownable(initialOwner) {}

  /**
   * @dev Authorize an address to request data
   * @param target The address to authorize
   */
  function authorizedRequester(address target) public onlyOwner {
    _authorizedRequester[target] = true;
  }

  /**
   * @dev Unauthorize an address to request data
   * @param target The address to unauthorize
   */
  function unauthorizedRequester(address target) public onlyOwner {
    _authorizedRequester[target] = false;
  }

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
   * @dev Request data from an off-chain service
   * @param verificationTimestamp The timestamp of the request
   * @param url The URL of the data to fetch
   * @param params The parameters of the request
   * @param keys Keys of the data to fetch
   * @param condition The condition of the request
   * @return The ID of the request
   */
  function request(
    uint256 verificationTimestamp,
    string memory url,
    string[] memory params,
    string[] memory keys,
    string memory condition
  ) public returns(uint256) {
    if (!_authorizedRequester[msg.sender]) revert OffChainDataFetchErrors.UnauthorizedRequester();
    uint256 id = uint256(keccak256(abi.encode(verificationTimestamp, url, keys, condition))); // Generate a unique ID
    emit Request(verificationTimestamp, id, msg.sender, url, params, keys, condition); // emit event Request for the off-chain service
    return id;
  }

  function requestAutomatic(
    uint256 verificationTimestamp,
    string memory url,
    string[] memory params,
    string[] memory keys,
    string memory condition
  ) public returns(uint256) {
    if (!_authorizedRequester[msg.sender]) revert("OffChainDataFetch: unauthorized requester");
    uint256 id = uint256(keccak256(abi.encode(verificationTimestamp, url, keys, condition))); // Generate a unique ID
    emit RequestAutomatic(verificationTimestamp, id, msg.sender, url, params, keys, condition); // emit event Request for the off-chain service
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