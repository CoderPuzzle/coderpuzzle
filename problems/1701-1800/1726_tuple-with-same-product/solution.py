from collections import Counter
from typing import List, Optional


class Solution:
    def tupleSameProduct(self, nums: List[int]) -> int:
        # Two unordered pairs with equal products never share an element —
        # a * b = a * c would force b = c — so any 2 of the c pairs over
        # one product use four distinct elements and extend to exactly 8
        # tuples: choose the two pairs (C(c, 2) ways), order each pair
        # (2 * 2), and choose which pair plays (a, b) (2). Products top
        # out at 10^8 and the count at a few times 10^7, both inside the
        # 32-bit answer type.
        pairs = Counter()
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                pairs[nums[i] * nums[j]] += 1
        return sum(count * (count - 1) // 2 * 8 for count in pairs.values())
