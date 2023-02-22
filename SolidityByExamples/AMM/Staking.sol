// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingRewards {
  IERC20 public immutable stakingToken;
  IERC20 public immutable rewardsToken;

  address public owner;

  uint public duration;
  uint public finishAt;
  uint public updatedAt;
  uint public rewardRate;
  uint public rewardPerTokenStored;
  mapping(address => uint) public userRewardPerTokenPaid;
  mapping(address => uint) public rewards;

  uint public totalSupply;
  mapping(address => uint) public balanceOf;

  modifier onlyOwner() {
    require(msg.sender == owner, "not owner");
    _;
  }

  constructor(address _stakingToken, address _rewardsToken) {
    owner = msg.sender;
    stakingToken = IERC20(_stakingToken);
    rewardsToken = IERC20(_rewardsToken);
  }

  function setRewardsDuration(uint _duration) external onlyOwner {
    require(finishAt < block.timestamp, "reward duration not finished");
    duration = _duration;
  }

  function notifyRewardAmount(uint _amount) external onlyOwner {
    if(block.timestamp > finishAt) {
      rewardRate = _amount / duration;
    } else {
      uint remainingRewards = rewardRate * (finishAt - block.timestamp);
      rewardRate = (remainingRewards + _amount) / duration;
    }

    require(rewardRate > 0, "reward rate = 0");
    require(rewardRate * duration <= rewardsToken.balanceOf(address(this)), "reward amount > balance");
  }

  function stake(uint _amount) external {}
  function unstake(uint _amount) external {}
  function earned(address _account) external view returns(uint) {}
  function claimReward() external {}
}