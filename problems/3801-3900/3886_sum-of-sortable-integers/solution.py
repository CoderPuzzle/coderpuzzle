from typing import List


class Solution:
    def sortableIntegers(self, nums: List[int]) -> int:
        n = len(nums)
        ordered = sorted(nums)
        divisors = []
        d = 1
        while d * d <= n:
            if n % d == 0:
                divisors.append(d)
                if d * d != n:
                    divisors.append(n // d)
            d += 1
        divisors.sort()
        total = 0
        for k in divisors:
            if all(self._is_rotation(nums[start : start + k], ordered[start : start + k]) for start in range(0, n, k)):
                total += k
        return total

    def _is_rotation(self, block: List[int], target: List[int]) -> bool:
        # A sequence is a cyclic rotation of `block` exactly when it appears
        # inside `block + block`; a KMP scan answers that in O(k).
        text = block + block
        k = len(target)
        pi = [0] * k
        for i in range(1, k):
            j = pi[i - 1]
            while j > 0 and target[i] != target[j]:
                j = pi[j - 1]
            if target[i] == target[j]:
                j += 1
            pi[i] = j
        j = 0
        for value in text:
            while j > 0 and value != target[j]:
                j = pi[j - 1]
            if value == target[j]:
                j += 1
            if j == k:
                return True
        return False
