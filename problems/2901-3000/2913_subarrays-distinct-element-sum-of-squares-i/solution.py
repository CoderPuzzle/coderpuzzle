from typing import List


class Solution:
    def sumCounts(self, nums: List[int]) -> int:
        n = len(nums)
        ans = 0
        # For each left end, grow the right end one element at a time; the
        # running distinct set only ever grows, so len(seen) is the
        # distinct count of every prefix subarray nums[i..j].
        for i in range(n):
            seen = set()
            for j in range(i, n):
                seen.add(nums[j])
                ans += len(seen) * len(seen)
        return ans
