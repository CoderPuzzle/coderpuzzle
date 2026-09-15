MOD = 1_000_000_007


class Solution:
    def findDerangement(self, n: int) -> int:
        # Element 1 lands at some position i != 1 (n - 1 ways); either i's
        # element takes 1's slot (D(n - 2) ways) or it does not (D(n - 1)
        # ways), so D(n) = (n - 1) * (D(n - 1) + D(n - 2)). Python ints
        # never overflow, so the per-step mod is the only reduction needed.
        prev, cur = 1, 0  # D(0), D(1)
        for i in range(2, n + 1):
            prev, cur = cur, (i - 1) * (cur + prev) % MOD
        return cur
