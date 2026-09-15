from typing import List


class Solution:
    def getSum(self, nums: List[int]) -> int:
        # Scan maximal constant-step (+1 / -1) runs left to right, carrying
        # ending, the sum of all consecutive subarrays that end at the
        # current index. Repeating the direction grows the run and extends
        # every such subarray (ending += chain * x after the increment); a
        # unit step in a new direction keeps only the fresh pair plus [x];
        # any other step keeps only [x]. Reduced mod 10**9 + 7 each step.
        mod = 10**9 + 7
        total, chain, ending, direction = nums[0], 1, nums[0], 0
        for i in range(1, len(nums)):
            d = nums[i] - nums[i - 1]
            if d == direction and d != 0:
                chain += 1
                ending = (ending + chain * nums[i]) % mod
            elif d == 1 or d == -1:
                direction, chain = d, 2
                ending = (nums[i - 1] + 2 * nums[i]) % mod
            else:
                direction, chain, ending = 0, 1, nums[i]
            total = (total + ending) % mod
        return total
