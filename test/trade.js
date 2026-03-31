const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Trade Contract", function () {
  let Trade, trade, seller, buyer;

  beforeEach(async function () {
    [seller, buyer] = await ethers.getSigners();
    Trade = await ethers.getContractFactory("Trade");
    trade = await Trade.deploy(); // ethers v6, no .deployed()

    // Seller creates a trade
    await trade.connect(seller).createTrade("Laptop");
  });

  it("Buyer can accept trade", async function () {
    await trade.connect(buyer).acceptTrade(0);
    const t = await trade.trades(0);
    expect(t.buyer).to.equal(buyer.address);
  });

  it("Cannot accept already accepted trade", async function () {
    await trade.connect(buyer).acceptTrade(0);
    await expect(trade.connect(seller).acceptTrade(0)).to.be.revertedWith("Already accepted");
  });

  it("Seller creates trade correctly", async function () {
    const t = await trade.trades(0);
    expect(t.seller).to.equal(seller.address);
    expect(t.item).to.equal("Laptop");
    expect(t.completed).to.equal(false);
    expect(t.buyer).to.equal("0x0000000000000000000000000000000000000000"); // ✅ ethers v6 fix
  });

  // ✅ Complete trade test
  it("Buyer or seller can complete trade", async function () {
    await trade.connect(buyer).acceptTrade(0);   // Accept first
    await trade.connect(seller).completeTrade(0); // Then complete
    const t = await trade.trades(0);
    expect(t.completed).to.equal(true);
  });
});