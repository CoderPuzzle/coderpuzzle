from typing import List, Optional


class Solution:
    def findKthSmallest(self, coins: List[int], k: int) -> int:
        def gcd(a, b):
            while b:
                a, b = b, a % b
            return a

        m = len(coins)

        def count_le(x):
            total = 0
            # inclusion-exclusion: each subset S contributes floor(x / lcm(S))
            for mask in range(1, 1 << m):
                l = 1
                bits = 0
                overflow = False
                for j in range(m):
                    if mask >> j & 1:
                        g = gcd(l, coins[j])
                        l = l // g * coins[j]
                        bits += 1
                        # an lcm past x would only contribute 0; stop early
                        if l > x:
                            overflow = True
                            break
                if overflow:
                    continue
                # odd subsets add, even subtract, so duplicates count once
                if bits % 2 == 1:
                    total += x // l
                else:
                    total -= x // l
            return total

        # count(x) is monotone; the answer is the least x with count(x) >= k
        # (the k-th multiple of the smallest coin is a safe upper bound)
        lo, hi = 1, k * min(coins)
        while lo < hi:
            mid = (lo + hi) // 2
            if count_le(mid) >= k:
                hi = mid
            else:
                lo = mid + 1
        return lo
