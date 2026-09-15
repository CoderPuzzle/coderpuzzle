from typing import List, Optional

MOD = 10**9 + 7


class Solution:
    def numOfSubarrays(self, arr: List[int]) -> int:
        # `even`/`odd` count prefixes seen so far (including the empty
        # prefix before the array) with even/odd parity; a new odd-parity
        # prefix pairs with every earlier even prefix to make an odd-sum
        # subarray, and symmetrically for a new even-parity prefix.
        even, odd = 1, 0
        parity = 0
        total = 0
        for x in arr:
            parity ^= x & 1
            if parity == 1:
                total += even
                odd += 1
            else:
                total += odd
                even += 1
        return total % MOD
