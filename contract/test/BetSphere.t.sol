// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Test, console} from "forge-std/Test.sol";
import '../src/BetSphere.sol';
import '../src/OffChainDataFetch.sol';

contract BetSphereTest is Test {
  OffChainDataFetch public offChainDataFetch;
  BetSphere public betSphere;

  address private oracle = makeAddr("oracle");
  address private owner = makeAddr("owner");
  address private user1 = makeAddr("user1");
  address private user2 = makeAddr("user2");
  address private user3 = makeAddr("user3");
  address private verifier = makeAddr("verifier");

  function setUp() public {
    vm.startPrank(owner);

    betSphere = new BetSphere(address(oracle));

    vm.stopPrank();
  }

  function testGetBetId() public {
    uint256 id = testCreateBet("", "", new string[](0), new string[](0));

    string memory url = "https://api.coingecko.com/api/v3/simple/price";
    string memory condition = "if(price > 1000)return 1;return 2;";

    uint256 betId = betSphere.getBetId(condition, "https://api.coingecko.com/api/v3/simple/price", 2);

    require(betId == id, "Bet ID not set");
  }

  function testCreateBet(
    string memory url,
    string memory condition,
    string[] memory params,
    string[] memory keys
  ) public returns(uint256) {
    vm.startPrank(owner);

    if (bytes(url).length == 0) {
      url = "https://api.coingecko.com/api/v3/simple/price";
    }
    if (bytes(condition).length == 0) {
      condition = "if(price > 1000)return 1;return 2;";
    }
    if (params.length == 0) {
      params = new string[](1);
      params[0] = "usd";
    }
    if (keys.length == 0) {
      keys = new string[](1);
      keys[0] = "price";
    }

    uint256 id = betSphere.createBet(2, 1000, url, condition, params, keys);

    BetInfo memory bet = betSphere.betInfo(id);
    require(bet.id == id, "Bet not created");
    require(keccak256(bytes(bet.condition)) == keccak256(bytes(condition)), "Condition not set");
    require(keccak256(bytes(bet.url)) == keccak256(bytes(url)), "URL not set");
    string[] memory betKeys = bet.keys;
    require(betKeys.length == keys.length, "Keys incorrect length");
    require(keccak256(bytes(betKeys[0])) == keccak256(bytes(keys[0])), "Key not set");
    string[] memory betParams = bet.params;
    require(betParams.length == params.length, "Params incorrect length");
    require(keccak256(bytes(betParams[0])) == keccak256(bytes(params[0])), "Param not set");
    require(bet.directionsAmount.length == 2, "Directions amount incorrect length");
    require(bet.directionsAmount[0] == 0, "Directions amount 1 not set");
    require(bet.directionsAmount[1] == 0, "Directions amount 2 not set");

    vm.stopPrank();

    return id;
  }

  function testBetFor() public {
    uint256 id = testCreateBet("", "", new string[](0), new string[](0));

    vm.startPrank(user1);

    vm.deal(user1, 1 ether);

    betSphere.betFor{value: 1 ether}(id, 1);

    UserBet memory userBet = betSphere.userBetById(id, user1);

    require(userBet.amount == 1 ether, "Amount not set");
    require(userBet.direction == 1, "Direction not set");
    require(userBet.id == id, "id not set");

    vm.stopPrank();
  }

  function testBetForShouldRevertInvalidDirection() public {
    uint256 id = testCreateBet("", "", new string[](0), new string[](0));

    vm.startPrank(user1);

    vm.deal(user1, 1 ether);

    vm.expectRevert("Invalid direction");
    betSphere.betFor{value: 1 ether}(id, 0);

    vm.expectRevert("Invalid direction");
    betSphere.betFor{value: 1 ether}(id, 3);

    vm.stopPrank();
  }

  function testBetForShouldRevertNoValueSent() public {
    uint256 id = testCreateBet("", "", new string[](0), new string[](0));

    vm.startPrank(user1);

    vm.expectRevert("No value sent");
    betSphere.betFor(id, 1);

    vm.stopPrank();
  }

  function testGetOdds() public {
    uint256 id = testCreateBet("", "", new string[](0), new string[](0));

    uint256[] memory odds = betSphere.getOdds(id);
    BetInfo memory bet = betSphere.betInfo(id);

    require(odds.length == 2, "Odds incorrect length");
    require(odds[0] == 0, "Odds 1 not set");
    require(odds[1] == 0, "Odds 2 not set");

    vm.startPrank(user1);

    vm.deal(user1, 1 ether);

    betSphere.betFor{value: 1 ether}(id, 1);

    bet = betSphere.betInfo(id);
    odds = betSphere.getOdds(id);

    require(bet.directionsAmount[0] == 1 ether, "Directions amount 1 not set");
    require(bet.directionsAmount[1] == 0, "Directions amount 2 not set");
    require(bet.total == 1 ether, "Total not set");
    require(odds[0] == 9500, "Odds 1 not set");
    require(odds[1] == 0, "Odds 2 not set");

    vm.stopPrank();

    vm.startPrank(user2);

    vm.deal(user2, 2 ether);

    betSphere.betFor{value: 2 ether}(id, 2);

    bet = betSphere.betInfo(id);
    odds = betSphere.getOdds(id);

    require(bet.directionsAmount[0] == 1 ether, "Directions amount 1 not set");
    require(bet.directionsAmount[1] == 2 ether, "Directions amount 2 not set");
    require(bet.total == 3 ether, "Total not set");

    require(odds[0] == 28500, "Odds 1 not set");
    require(odds[1] == 14250, "Odds 2 not set");

    vm.stopPrank();
  }

  function testWithdraw() public {
    uint256 id = testCreateBet("", "", new string[](0), new string[](0));

    vm.startPrank(user1);

    vm.deal(user1, 1 ether);

    betSphere.betFor{value: 1 ether}(id, 1);

    vm.stopPrank();

    vm.startPrank(user2);

    vm.deal(user2, 2 ether);

    betSphere.betFor{value: 2 ether}(id, 2);

    vm.stopPrank();

    vm.startPrank(oracle);

    betSphere.fulfillRequest(id, 1);

    vm.stopPrank();

    vm.startPrank(user1);

    uint256 balanceBefore = user1.balance;

    require(balanceBefore == 0, "Balance not set");

    betSphere.withdraw(id);

    uint256 balanceAfter = user1.balance;

    require(balanceAfter == 2.85 ether, "Balance not set");

    vm.stopPrank();
  }

  function testGetActiveBets() public {
    uint256 id1 = testCreateBet("", "", new string[](0), new string[](0));
    uint256 id2 = testCreateBet("test2", "", new string[](0), new string[](0));
    uint256 id3 = testCreateBet("test3", "", new string[](0), new string[](0));
    uint256 id4 = testCreateBet("test4", "", new string[](0), new string[](0));

    vm.startPrank(user1);

    vm.deal(user1, 10 ether);

    betSphere.betFor{value: 1 ether}(id1, 1);
    betSphere.betFor{value: 2 ether}(id2, 1);
    betSphere.betFor{value: 3 ether}(id3, 1);
    betSphere.betFor{value: 4 ether}(id4, 1);

    uint256[] memory activeBets = betSphere.getActiveBetsByUser(user1);

    for (uint256 i = 0; i < activeBets.length; i++) {
      require(
        activeBets[i] == id1 ||
        activeBets[i] == id2 ||
        activeBets[i] == id3 ||
        activeBets[i] == id4,
        "Active bet not set"
      );
    }

    betSphere.withdraw(id1);

    activeBets = betSphere.getActiveBetsByUser(user1);

    require(activeBets.length == 3, "Active bets incorrect length");

    for (uint256 i = 0; i < activeBets.length; i++) {
      require(activeBets[i] != id1, "Active bet not deleted correctly");
      require(
        activeBets[i] == id2 ||
        activeBets[i] == id3 ||
        activeBets[i] == id4,
        "Active bet not set"
      );
    }

    vm.stopPrank();
  }
}
