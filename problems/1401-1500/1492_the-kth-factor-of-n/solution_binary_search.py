class Solution:
    def kthFactor(self, n: int, k: int) -> int:
        def count_at_most(m: int) -> int:
            # Count divisors of n up to m by pairing d with n // d.
            count = 0
            d = 1
            while d * d <= n:
                if n % d == 0:
                    if d <= m:
                        count += 1
                    complement = n // d
                    if complement != d and complement <= m:
                        count += 1
                d += 1
            return count

        lo, hi = 1, n
        while lo < hi:
            mid = (lo + hi) // 2
            if count_at_most(mid) >= k:
                hi = mid
            else:
                lo = mid + 1
        return lo if count_at_most(lo) >= k else -1
