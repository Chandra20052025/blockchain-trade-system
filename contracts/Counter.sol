// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
    uint256 public x;

    event Increment(uint256 value);

    function inc() public {
        x += 1;
        emit Increment(1);
    }

    function dec() public {
        require(x > 0, "Cannot go below zero");
        x -= 1;
    }

    function incBy(uint256 value) public {
        require(value > 0, "Value must be greater than zero");
        x += value;
        emit Increment(value);
    }
}
