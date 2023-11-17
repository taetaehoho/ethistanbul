// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Bytes32ToString {
    function bytes32ToString(
        bytes32 _bytes32
    ) internal pure returns (string memory) {
        bytes memory buffer = new bytes(32);
        for (uint256 i = 0; i < 32; i++) {
            buffer[i] = _bytes32[i];
            if (_bytes32[i] == 0) {
                break; // Optional: Stop at the first null character
            }
        }
        return string(buffer);
    }
}
