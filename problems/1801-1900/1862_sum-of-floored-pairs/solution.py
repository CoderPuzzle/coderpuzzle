from typing import List, Optional


class Solution:
    def sumOfFlooredPairs(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        if not nums:
            return 0
        max_val = max(nums)
        count = [0] * (max_val + 1)
        for v in nums:
            count[v] += 1
        prefix = [0] * (max_val + 1)
        running = 0
        for v in range(max_val + 1):
            running += count[v]
            prefix[v] = running
        total = 0
        for y in range(1, max_val + 1):
            if count[y] == 0:
                continue
            # sum over x of floor(x / y) * count[x]
            # = sum over m >= 1 of #{x : x >= m * y}
            c = 0
            m = y
            while m <= max_val:
                c += prefix[max_val] - prefix[m - 1]
                m += y
            total = (total + count[y] * c) % MOD
        return total
