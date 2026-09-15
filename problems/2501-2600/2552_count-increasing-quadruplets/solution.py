from itertools import accumulate
from typing import List


class Solution:
    def countQuadruplets(self, nums: List[int]) -> int:
        # For every pair j < k with nums[k] < nums[j], a quadruplet is any
        # i < j with nums[i] < nums[k] plus any l > k with nums[l] > nums[j].
        # One sweep per j keeps both side counts live: a diff array plus
        # accumulate rebuild the less-than row at C speed, while c rides the
        # right-to-left window walk as the suffix-greater count.
        n = len(nums)
        ans = 0
        diff = [0] * (n + 2)
        for j in range(1, n - 2):
            diff[nums[j - 1] + 1] += 1
            vj = nums[j]
            less = list(accumulate(diff))  # less[x] = #{i < j : nums[i] < x}
            c = 0
            tot = 0
            for uk in nums[n - 1 : j : -1]:
                if uk < vj:
                    tot += less[uk] * c
                elif uk > vj:
                    c += 1
            ans += tot
        return ans
