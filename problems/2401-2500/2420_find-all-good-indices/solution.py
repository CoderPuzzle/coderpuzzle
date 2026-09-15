from typing import List


class Solution:
    def goodIndices(self, nums: List[int], k: int) -> List[int]:
        # Run-length DP: noninc[i] is the longest non-increasing run ending
        # at i; nondec[i] the longest non-decreasing run starting at i.
        # Index i is good exactly when both runs flanking it reach length
        # k: noninc[i-1] >= k covers nums[i-k..i-1], nondec[i+1] >= k
        # covers nums[i+1..i+k]. Two linear sweeps plus one pass over the
        # candidate range replace an O(n*k) window scan.
        n = len(nums)
        noninc = [1] * n
        nondec = [1] * n
        for i in range(1, n):
            if nums[i] <= nums[i - 1]:
                noninc[i] = noninc[i - 1] + 1
        for i in range(n - 2, -1, -1):
            if nums[i] <= nums[i + 1]:
                nondec[i] = nondec[i + 1] + 1
        return [i for i in range(k, n - k) if noninc[i - 1] >= k and nondec[i + 1] >= k]
