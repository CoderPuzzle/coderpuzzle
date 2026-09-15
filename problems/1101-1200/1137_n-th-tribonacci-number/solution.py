class Solution:
    def tribonacci(self, n: int) -> int:
        if n == 0:
            return 0
        # Window of (T0, T1, T2); each step advances it by one term.
        a, b, c = 0, 1, 1
        for _ in range(n - 2):
            a, b, c = b, c, a + b + c
        return c
