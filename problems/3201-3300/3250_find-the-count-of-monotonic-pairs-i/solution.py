from typing import List


class Solution:
    def countOfPairs(self, nums: List[int]) -> int:
        # A pair is fixed once arr1 is chosen (arr2[i] = nums[i] - arr1[i]);
        # its rules collapse onto arr1: 0 <= arr1[i] <= nums[i], arr1
        # non-decreasing, and arr2 non-increasing, which together give
        # arr1[i] >= arr1[i - 1] + max(0, nums[i] - nums[i - 1]).
        #
        # dp[v] counts prefixes ending with arr1[i] = v; pref is the
        # inclusive prefix sum of dp, so row i reads pref[v - d] per value
        # and is re-summed into the next pref. The lookup index stays
        # inside the previous row (a rise subtracts back out of v), and
        # every stored value is reduced below 10**9 + 7, so intermediates
        # stay under 2 * (10**9 + 6).
        mod = 10**9 + 7
        pref = [v + 1 for v in range(nums[0] + 1)]  # dp[v] = 1 at i = 0
        for i in range(1, len(nums)):
            d = max(0, nums[i] - nums[i - 1])
            dp = [pref[v - d] if v >= d else 0 for v in range(nums[i] + 1)]
            acc = 0
            pref = []
            for x in dp:
                acc = (acc + x) % mod
                pref.append(acc)
        return pref[-1]
