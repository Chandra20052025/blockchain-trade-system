import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Counter", function () {
  it("Should emit the Increment event when calling the inc() function", async function () {
    const counter = await ethers.deployContract("Counter");

    await expect(counter.inc())
      .to.emit(counter, "Increment")
      .withArgs(1n);
  });

  it("The sum of the Increment events should match the current value", async function () {
    const counter = await ethers.deployContract("Counter");
    const deploymentBlockNumber = await ethers.provider.getBlockNumber();

    // run increments
    for (let i = 1; i <= 10; i++) {
      await counter.incBy(i);
    }

    // get events
    const filter = counter.filters.Increment();
    const events = await counter.queryFilter(filter, deploymentBlockNumber);

    // FIX: use BigInt
    let sum = 0n;

    for (const event of events) {
      sum += event.args[0];   // already BigInt
    }

    // compare correctly
    expect(sum).to.equal(await counter.x());
  });
});
