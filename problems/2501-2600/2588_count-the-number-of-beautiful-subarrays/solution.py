from typing import List, Optional


class Solution:
    def beautifulSubarrays(self, nums: List[int]) -> int:
        # Each operation clears one set bit in each of two elements, so the
        # XOR of a subarray is invariant; it reduces to all zeros exactly
        # when its XOR is already 0.
        count = {}
        # Seed with the empty prefix so subarrays starting at index 0 are
        # witnessed when their prefix XOR returns to 0.
        count[0] = 1
        x = 0
        ans = 0
        for v in nums:
            x ^= v
            # Subarray (j, i] has XOR prefix[j] ^ prefix[i], which vanishes
            # exactly when the prefixes match: each earlier equal prefix is
            # one beautiful subarray ending here.
            ans += count.get(x, 0)
            count[x] = count.get(x, 0) + 1
        return ans
