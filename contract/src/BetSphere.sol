// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.25;

import {IOffChainDataFetch} from "./Interface/IOffChainDataFetch.sol";

enum BetDirection {
  For,
  Against
}

struct UserBet {
  uint256 id;
  uint256 amount;
  uint8 direction;
}

struct BetInfo {
  uint256 id;
  uint256 timestamp;
  uint256 amountBetFor;
  uint256 amountBetAgainst;
  string url;
  string condition;
}

/**
 * @title BetSphere
 * @dev Contract to place bets
 */
contract BetSphere {
  address private _router;
  uint256 private _fees = 500; // 0.5% fees
  uint256 private _minimalFees = 0.001 ether;

  mapping (uint256 => BetInfo) public bets;

  event Bet(uint256 id, uint256 timestamp, string url);
  event Result(uint256 id, string value);

  constructor(address oracleRouter) {
    _router = oracleRouter;
  }

  /**
   * @dev Create a new bet
   * @param timestamp The timestamp of the bet
   * @param url The URL of the data to fetch
   * @param key The key of the data to fetch
   * @param condition The condition of the bet
   * @param direction The direction of the bet
   * @return The ID of the bet
   */
  function createBet(uint256 timestamp, string memory url, string memory key, string memory condition, uint8 direction) public payable returns(uint256) {
    uint256 id = uint256(keccak256(abi.encodePacked(timestamp, url))); // Generate a unique ID
    bets[id] = BetInfo(id, timestamp, 0, 0, url, condition);

    emit Bet(id, timestamp, url);
    return id;
  }

  function requestOracle(uint256 id) public {
    if (bets[id].timestamp < block.timestamp) revert("Bet has not ended yet");
    BetInfo storage bet = bets[id];
    IOffChainDataFetch(_router).request(bet.timestamp, bet.url);
  }

  function fulfillRequest(uint256 id, uint8 direction) public {
    if (msg.sender != _router) revert("Only the oracle can close the bet");
    if (bets[id].timestamp < block.timestamp) revert("Bet has not ended yet");
  }
}