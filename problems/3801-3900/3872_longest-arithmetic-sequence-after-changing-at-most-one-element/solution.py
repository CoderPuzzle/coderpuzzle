from typing import List


class Solution:
    def longestArithmetic(self, nums: List[int]) -> int:
        # left[i] / right[i]: longest run of equal consecutive differences
        # ending at i / starting at i (a pair always counts as a run of 2).
        # Every value is bounded by n <= 10^5, so int arithmetic is safe.
        n = len(nums)
        left = [1] * n
        for i in range(1, n):
            if i >= 2 and nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]:
                left[i] = left[i - 1] + 1
            else:
                left[i] = 2
        right = [1] * n
        for i in range(n - 2, -1, -1):
            if i <= n - 3 and nums[i + 1] - nums[i] == nums[i + 2] - nums[i + 1]:
                right[i] = right[i + 1] + 1
            else:
                right[i] = 2
        best = max(left)
        # Replacing nums[p] either stops the subarray at p (extending the
        # run on one side) or spans p, gluing a left run to a right run
        # whose common difference is forced to (nums[p+1]-nums[p-1])/2.
        for p in range(n):
            if p >= 1:
                cand = left[p - 1] + 1
                if cand > best:
                    best = cand
            if p <= n - 2:
                cand = right[p + 1] + 1
                if cand > best:
                    best = cand
            if 1 <= p <= n - 2:
                diff = nums[p + 1] - nums[p - 1]
                if diff % 2 == 0:
                    d = diff // 2
                    left_len = left[p - 1] if p >= 2 and nums[p - 1] - nums[p - 2] == d else 1
                    right_len = right[p + 1] if p <= n - 3 and nums[p + 2] - nums[p + 1] == d else 1
                    cand = left_len + right_len + 1
                    if cand > best:
                        best = cand
        return best
