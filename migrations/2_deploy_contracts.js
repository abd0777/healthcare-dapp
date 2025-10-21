const AppointmentPayment = artifacts.require("AppointmentPayment");

module.exports = async function (deployer, network, accounts) {
  // Set the hospital admin wallet
  const adminWallet = "0x8aF8BEFCEC9604348C67eFc1d1C175337481dfBe";

  // Deploy the contract with constructor argument
  await deployer.deploy(AppointmentPayment, adminWallet);

  // Now safely access the deployed instance
  const instance = await AppointmentPayment.deployed();
  console.log("AppointmentPayment deployed at:", instance.address);
};
