from typing import List, Optional


class Solution:
    def kthSmallestPrimeFraction(self, arr: List[int], k: int) -> List[int]:
        n = len(arr)
        lo, hi = 0.0, 1.0
        ans = [arr[0], arr[-1]]
        # Binary search on the fraction value; count fractions <= mid.
        for _ in range(50):
            mid = (lo + hi) / 2.0
            count = 0
            best = 0.0
            best_pair = (arr[0], arr[-1])
            j = 1
            for i in range(n - 1):
                while j < n and arr[i] > mid * arr[j]:
                    j += 1
                count += n - j
                if j < n:
                    val = arr[i] / arr[j]
                    if val > best:
                        best = val
                        best_pair = (arr[i], arr[j])
            if count >= k:
                hi = mid
                ans = list(best_pair)
            else:
                lo = mid
        return ans
