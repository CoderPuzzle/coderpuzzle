from typing import List, Optional


class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        pos = nums.index(k)
        balance = {0: 1}
        current = 0
        count = 0
        for i, v in enumerate(nums):
            if v > k:
                current += 1
            elif v < k:
                current -= 1
            if i >= pos:
                # Subarrays ending here with balance 0 or 1 have median k.
                count += balance.get(current, 0) + balance.get(current - 1, 0)
            else:
                balance[current] = balance.get(current, 0) + 1
        return count
