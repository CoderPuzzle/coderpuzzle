class Solution:
    def minimumPerimeter(self, neededApples: int) -> int:
        # A square plot with half-side k covers the integer coordinates
        # [-k,k]^2. Summing |i| + |j| over that box gives
        # apples(k) = 2k(k+1)(2k+1); the answer is 8k for the smallest k
        # with apples(k) >= neededApples. neededApples <= 10^15 implies
        # k <= 63000, so a doubling upper bound plus binary search converges
        # in ~40 steps.
        def apples(k: int) -> int:
            return 2 * k * (k + 1) * (2 * k + 1)

        hi = 1
        while apples(hi) < neededApples:
            hi *= 2
        lo = 1
        while lo < hi:
            mid = (lo + hi) // 2
            if apples(mid) >= neededApples:
                hi = mid
            else:
                lo = mid + 1
        return 8 * lo
