// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.25;

interface BetSphereErrors {
  error InvalidVerificationTimestamp();

  error InvalidBetDirection();

  error InvalidTimestamp();

  error InvalidCaller();

  error NoFundsSent();

  error BetNotFound();

  error BetEnded();

  error BetNotEnded();

  error BetResolved();

  error BetNotResolved();

  error CanNotBetOnMultipleDirections();

  error BetLost();

  error FailedToWithdraw();

  error NoFeesToWithdraw();

}