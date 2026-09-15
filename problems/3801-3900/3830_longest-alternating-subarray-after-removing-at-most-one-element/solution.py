from typing import List, Optional


class Solution:
    def longestAlternating(self, nums: List[int]) -> int:
        # inc[i] / dec[i]: longest alternating subarray ending at i whose
        # last comparison is < / > (1 = the lone nums[i]); rinc[j] / rdec[j]:
        # the same for subarrays starting at j, by first comparison. Every
        # value stays within n <= 10^5, so int arithmetic is safe.
        n = len(nums)
        inc = [1] * n
        dec = [1] * n
        for i in range(1, n):
            if nums[i - 1] < nums[i]:
                inc[i] = dec[i - 1] + 1
            elif nums[i - 1] > nums[i]:
                dec[i] = inc[i - 1] + 1
        rinc = [1] * n
        rdec = [1] * n
        for j in range(n - 2, -1, -1):
            if nums[j] < nums[j + 1]:
                rinc[j] = rdec[j + 1] + 1
            elif nums[j] > nums[j + 1]:
                rdec[j] = rinc[j + 1] + 1
        best = 1
        for i in range(n):
            if inc[i] > best:
                best = inc[i]
            if dec[i] > best:
                best = dec[i]
        # Removing nums[r] only helps when the subarray spans it: the bridge
        # comparison nums[r-1] vs nums[r+1] must alternate with both edge
        # comparisons; equal neighbours bridge nothing.
        for r in range(1, n - 1):
            if nums[r - 1] < nums[r + 1]:
                cand = dec[r - 1] + rdec[r + 1]
            elif nums[r - 1] > nums[r + 1]:
                cand = inc[r - 1] + rinc[r + 1]
            else:
                continue
            if cand > best:
                best = cand
        return best
