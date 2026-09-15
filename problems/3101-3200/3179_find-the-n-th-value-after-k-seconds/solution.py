MOD = 10**9 + 7


class Solution:
    def valueAfterKSeconds(self, n: int, k: int) -> int:
        # Each second turns the array into its own prefix sums, so the
        # update is one in-place running sum repeated k times. Every
        # entry is reduced below MOD each step, keeping two-entry sums
        # comfortably small. After k seconds, column n - 1 of this
        # prefix ladder has counted lattice paths, giving the binomial
        # C(n - 1 + k, k) — the combinatorial identity behind the
        # oracle's independent check.
        a = [1] * n
        for _ in range(k):
            for j in range(1, n):
                a[j] = (a[j] + a[j - 1]) % MOD
        return a[-1]
