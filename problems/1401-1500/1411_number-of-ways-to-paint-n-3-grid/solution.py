class Solution:
    def numOfWays(self, n: int) -> int:
        MOD = 10**9 + 7
        a, b = 6, 6
        for _ in range(n - 1):
            a, b = (3 * a + 2 * b) % MOD, (2 * a + 2 * b) % MOD
        return (a + b) % MOD
