// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Trade {

    uint public tradeCount = 0;

    struct TradeItem {
        uint id;
        address seller;
        string item;
        uint price;
        bool completed;
    }

    mapping(uint => TradeItem) public trades;

    // ===== EVENT =====
    event TradeCreated(uint id, address seller, string item, uint price);

    // ===== CREATE TRADE =====
    function createTrade(string memory _item, uint _price) public {
        tradeCount++;

        trades[tradeCount] = TradeItem(
            tradeCount,
            msg.sender,
            _item,
            _price,
            false
        );

        emit TradeCreated(tradeCount, msg.sender, _item, _price);
    }
}