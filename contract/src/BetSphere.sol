// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.25;

import {IOffChainDataFetch} from "./Interface/IOffChainDataFetch.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

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
  uint8 status;
  uint8 result;
  uint256 id;
  uint256 timestamp;
  uint256 total;
  uint256[] directionsAmount;
  string url;
  string condition;
  string[] keys;
  string[] params;
}

enum BetStatus {
  NotInitiated,
  Initialized,
  Ended
}

/**
 * @title BetSphere
 * @dev Contract to place bets
 */
contract BetSphere is Ownable(msg.sender) {
  address public feeRecipient;
  address private _router;
  uint256 private _fees = 500; // 0.5% fees
  uint256 private _minimalFees = 0.001 ether;
  uint256 public feeAmount;

  mapping (uint256 => BetInfo) private _bets;
  mapping (address => mapping (uint256 => UserBet)) public userBets;

  event Bet(uint256 indexed id, uint256 timestamp, string url);
  event Result(uint256 indexed id, string indexed value);

  constructor(address oracleRouter) {
    _router = oracleRouter;
  }

  /**
   * @dev Create a new bet
   * @param maxDirection The maximum directions for the bet
   * @param timestamp The timestamp of the bet
   * @param url The URL of the data to fetch
   * @param key The key of the data to fetch
   * @param condition The condition of the bet
   * @return The ID of the bet
   */
  function createBet(
    uint256 maxDirection,
    uint256 timestamp,
    string memory url,
    string memory condition,
    string[] memory params,
    string[] memory key
  ) public payable returns(uint256) {
    uint256 id = _computeId(condition, url, maxDirection); // Generate a unique ID
    _bets[id] = BetInfo(1, 0, id, timestamp, 0, new uint256[](maxDirection), url, condition, key, params);

    emit Bet(id, timestamp, url);
    return id;
  }

  function betFor(uint256 id, uint8 direction) public payable {
    if (direction == 0) revert("Invalid direction");
    if (msg.value == 0) revert("No value sent");
    BetInfo storage bet = _bets[id];
    UserBet storage userBet = userBets[msg.sender][id];
    if (bet.status == 0) revert("Bet not found");
    if (bet.status == 2) revert("Bet has ended");
    if (direction > bet.directionsAmount.length) revert("Invalid direction");
    if (bet.timestamp < block.timestamp) revert("");
    if (bet.result != 0) revert("Bet has already been resolved");
    if (userBet.direction != 0 && userBet.direction != direction) revert("Cannot bet on multiple directions");
    bet.total += msg.value;
    bet.directionsAmount[direction - 1] += msg.value;
    userBet.id = id;
    userBet.amount += msg.value;
    userBet.direction = direction;
  }

  function withdraw(uint256 id) public returns(uint256 amounts) {
    
  }

  function requestOracle(uint256 id) public {
    if (_bets[id].timestamp < block.timestamp) revert("Bet has not ended yet");
    BetInfo storage bet = _bets[id];
    IOffChainDataFetch(_router).request(bet.timestamp, bet.url);
  }

  function fulfillRequest(uint256 id, uint8 direction) public {
    if (msg.sender != _router) revert("Only the oracle can close the bet");
    if (_bets[id].timestamp < block.timestamp) revert("Bet has not ended yet");
    if (direction == 0) revert("Invalid direction");
    BetInfo storage bet = _bets[id];
    bet.result = direction;
    feeAmount += bet.total * _fees / 10000;
    emit Result(id, "Fulfilled");
  }

  function withdrawFees() public onlyOwner {
    if (feeAmount == 0) revert("No fees to withdraw");
    (bool success, ) =payable(feeRecipient).call{value: feeAmount}("");
    if (!success) revert("Failed to withdraw fees");
    feeAmount = 0;
  }

  function getOdds(uint256 id) public view returns(uint256[] memory) {
    BetInfo memory bet = _bets[id];
    uint256[] memory oddsByDirection = new uint256[](bet.directionsAmount.length);
    for (uint256 i = 0; i < bet.directionsAmount.length;) {
      if (bet.directionsAmount[i] == 0) {
        oddsByDirection[i] = 0;
        unchecked { i++; }
        continue;
      }
      uint256 amountMinusFees = bet.total - (bet.total * _fees / 10000);
      oddsByDirection[i] = amountMinusFees * 10000 / bet.directionsAmount[i];
      unchecked { i++; }
    }
    return oddsByDirection;
  }

  function getOddsByDirection(uint256 id, uint8 direction) public view returns(uint256) {
    BetInfo memory bet = _bets[id];
    if (bet.directionsAmount[direction] == 0) return 0;
    uint256 amountMinusFees = bet.total - (bet.total * _fees / 10000);
    return amountMinusFees * 10000 / bet.directionsAmount[direction];
  }

  function betInfo(uint256 id) public view returns(BetInfo memory) {
    return _bets[id];
  }

  function getBetStatus(uint256 id) public view returns(uint8) {
    return _bets[id].status;
  }

  function getBetResult(uint256 id) public view returns(uint8) {
    return _bets[id].result;
  }

  function userBetById(uint256 id, address user) public view returns(UserBet memory) {
    return userBets[user][id];
  }

  function getBetId(string memory condition, string memory url, uint256 maxDirection) public pure returns(uint256) {
    return _computeId(condition, url, maxDirection);
  }

  function _computeId(string memory condition, string memory url, uint256 maxDirection) private pure returns(uint256) {
    return uint256(keccak256(abi.encodePacked(condition, url, maxDirection)));
  }
}