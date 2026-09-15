from typing import List


class Solution:
    def countPairs(self, nums: List[int], k: int) -> int:
        # n <= 100, so the direct double loop over index pairs is the whole
        # story: equal values and (i * j) % k == 0.
        count = 0
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] == nums[j] and (i * j) % k == 0:
                    count += 1
        return count
