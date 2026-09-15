from typing import List
from operator import sub


class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        n = len(nums)
        # prefix[i] = sum of nums[:i]
        prefix = [0] * (n + 1)
        for i, x in enumerate(nums):
            prefix[i + 1] = prefix[i] + x
        # Exact comparison of averages via cross-multiplication:
        # s1/l1 > s2/l2  <=>  s1*l2 > s2*l1  (positive lengths).
        # best sum over subarrays of each exact length L in [k, n].
        best_sum = max(map(sub, prefix[k:], prefix))
        best_len = k
        for length in range(k + 1, n + 1):
            s = max(map(sub, prefix[length:], prefix))
            if s * best_len > best_sum * length:
                best_sum = s
                best_len = length
        return best_sum / best_len
