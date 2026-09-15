from typing import List


class Solution:
    def subsequenceSumOr(self, nums: List[int]) -> int:
        # Each element and each running prefix is itself a subsequence sum,
        # and together they carry every bit the full OR can raise, so one
        # pass folds both into the answer instead of enumerating 2^n sums.
        ans = pre = 0
        for x in nums:
            pre += x
            ans |= x | pre
        return ans
