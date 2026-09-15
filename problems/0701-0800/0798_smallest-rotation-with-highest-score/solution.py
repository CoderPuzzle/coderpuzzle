from typing import List


class Solution:
    def bestRotation(self, nums: List[int]) -> int:
        # Difference array over rotations: each element earns its point on a
        # contiguous range of k, so per-element +1/-1 marks and one prefix
        # pass rebuild every rotation's score without rotating anything.
        n = len(nums)
        diff = [0] * (n + 1)
        for i, v in enumerate(nums):
            if v <= i:
                # Scores at k in [0, i - v] and again at every k past i.
                diff[0] += 1
                diff[i - v + 1] -= 1
                if i + 1 < n:
                    diff[i + 1] += 1
            else:
                # Scores only after wrapping, at k in [i + 1, i + n - v].
                diff[i + 1] += 1
                diff[i + n - v + 1] -= 1
        best_k, best, score = 0, -1, 0
        for k in range(n):
            score += diff[k]
            # Strict > keeps the earliest k on ties, which the problem demands.
            if score > best:
                best, best_k = score, k
        return best_k
