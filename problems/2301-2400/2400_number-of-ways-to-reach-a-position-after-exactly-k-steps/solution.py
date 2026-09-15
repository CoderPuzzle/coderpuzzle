class Solution:
    def numberOfWays(self, startPos: int, endPos: int, k: int) -> int:
        # Only the distance matters. With r right and l left steps,
        # r - l = d and r + l = k force d <= k, (k - d) even, and
        # right = (k + d) // 2; any ordering of the steps is a distinct
        # way, so the count is C(k, right) mod 1e9+7.
        MOD = 10**9 + 7
        d = abs(endPos - startPos)
        if d > k or (k - d) % 2 != 0:
            return 0
        right = (k + d) // 2

        fact = [1] * (k + 1)
        for i in range(1, k + 1):
            fact[i] = fact[i - 1] * i % MOD
        inv_fact = [1] * (k + 1)
        inv_fact[k] = pow(fact[k], MOD - 2, MOD)
        for i in range(k, 0, -1):
            inv_fact[i - 1] = inv_fact[i] * i % MOD
        return fact[k] * inv_fact[right] % MOD * inv_fact[k - right] % MOD
