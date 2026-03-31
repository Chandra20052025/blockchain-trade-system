// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Trade {

    struct TradeItem {
        uint id;
        address seller;
        address buyer;
        string item;
        bool completed;
    }

    TradeItem[] public trades;

    event TradeCreated(uint id);
    event TradeAccepted(uint id);
    event TradeCompleted(uint id);

    // Create Trade
    function createTrade(string memory _item) public {
        trades.push(TradeItem(trades.length, msg.sender, address(0), _item, false));
        emit TradeCreated(trades.length - 1);
    }

    // Accept Trade
    function acceptTrade(uint _id) public {
        require(_id < trades.length, "Invalid trade ID");
        require(trades[_id].buyer == address(0), "Already accepted");

        trades[_id].buyer = msg.sender;

        emit TradeAccepted(_id);
    }

    // ✅ Add this **completeTrade** function **here, after acceptTrade**
    function completeTrade(uint _id) public {
        require(_id < trades.length, "Invalid trade ID");
        TradeItem storage t = trades[_id];

        // Only seller or buyer can complete
        require(
            msg.sender == t.seller || msg.sender == t.buyer,
            "Only seller or buyer can complete"
        );

        // Trade must have been accepted
        require(t.buyer != address(0), "Trade not accepted yet");
        
        // Mark as completed
        t.completed = true;

        emit TradeCompleted(_id);
    }

    // View all trades
    function getAllTrades() public view returns (TradeItem[] memory) {
        return trades;
    }
}