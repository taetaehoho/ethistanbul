// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IGateWay {
    struct Deposit {
        uint256 amount;
        uint256 blockNumber;
    }

    error InvalidNullifier();

    event Deposited(address sender, uint256 amount);
    event ProfileVerified(address indexed user);

    function depositCapital(uint256 amount, address asset) external;

    function deposits(
        address
    ) external view returns (uint256 amount, uint256 blockNumber);

    function getDeposits(
        address _calleraddr
    ) external view returns (Deposit memory deposit);

    function isVerified(address) external view returns (bool);

    function isVerifiedUser(address user) external view returns (bool);

    function verify(
        uint256 root,
        uint256 nullifierHash,
        uint256[8] memory proof
    ) external payable;
}
