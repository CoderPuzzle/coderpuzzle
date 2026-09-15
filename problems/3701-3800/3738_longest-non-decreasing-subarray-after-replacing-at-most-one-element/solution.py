from typing import List


class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        n = len(nums)
        # pref[i] is the longest non-decreasing run ending at i; suff[i] is
        # the longest non-decreasing run starting at i.
        pref = [1] * n
        for i in range(1, n):
            if nums[i - 1] <= nums[i]:
                pref[i] = pref[i - 1] + 1
        suff = [1] * n
        for i in range(n - 2, -1, -1):
            if nums[i] <= nums[i + 1]:
                suff[i] = suff[i + 1] + 1
        # No replacement spent: the best untouched run.
        ans = max(max(pref), max(suff))
        # Replace nums[p] to extend a single side; the new value is an
        # unbounded integer, so each direction alone is always feasible.
        for p in range(1, n):
            ans = max(ans, pref[p - 1] + 1)
        for p in range(n - 1):
            ans = max(ans, suff[p + 1] + 1)
        # Bridging both sides needs a value between the neighbors, which
        # exists exactly when nums[p-1] <= nums[p+1].
        for p in range(1, n - 1):
            if nums[p - 1] <= nums[p + 1]:
                ans = max(ans, pref[p - 1] + suff[p + 1] + 1)
        return ans
