from typing import List, Optional


class Solution:
    def canArrange(self, arr: List[int], k: int) -> bool:
        # tally remainder classes mod k (Python % is already non-negative);
        # r pairs only with k-r, and remainder 0 only with itself
        freq = [0] * k
        for x in arr:
            freq[x % k] += 1
        # the zero class must pair within itself -> even count
        if freq[0] % 2:
            return False
        # complementary classes r and k-r must match exactly (any pairing
        # inside matched classes works, so counts alone decide)
        for i in range(1, k // 2 + 1):
            if freq[i] != freq[k - i]:
                return False
        return True
