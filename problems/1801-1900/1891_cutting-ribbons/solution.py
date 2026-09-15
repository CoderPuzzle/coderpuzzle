class Solution:
    def maxLength(self, ribbons: List[int], k: int) -> int:
        # Monotone predicate: sum(r // x) >= k. Binary search the largest
        # feasible x; 0 when even x=1 fails.
        lo, hi = 1, max(ribbons)
        ans = 0
        while lo <= hi:
            mid = (lo + hi) // 2
            if sum(r // mid for r in ribbons) >= k:
                ans = mid
                lo = mid + 1
            else:
                hi = mid - 1
        return ans
