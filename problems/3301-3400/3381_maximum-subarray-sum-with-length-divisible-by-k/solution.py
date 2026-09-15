from typing import List, Optional


class Solution:
    def maxSubarraySum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]
        inf = float("inf")
        # min_pref[r]: smallest prefix sum seen at an index congruent to r
        # mod k. Length divisible by k means both endpoints share a residue,
        # so within each class maximize prefix[i] minus the earlier minimum.
        min_pref = {}
        # None rather than 0: an all-negative array still has a best answer.
        best = None
        for i in range(n + 1):
            r = i % k
            # Compare before updating the bucket, so the paired prefix is
            # strictly earlier and the subarray stays non-empty.
            if r in min_pref:
                cand = prefix[i] - min_pref[r]
                if best is None or cand > best:
                    best = cand
            if prefix[i] < min_pref.get(r, inf):
                min_pref[r] = prefix[i]
        return best
