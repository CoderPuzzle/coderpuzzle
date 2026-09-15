class Solution:
    def hasSameDigits(self, s: str) -> bool:
        # One operation is the linear map (I + S) on the digit vector over
        # Z/10, so after t = n-2 operations digit k is
        # sum_j C(t, j) * d[k+j] mod 10. C(t, j) mod 10 is CRT-assembled
        # from Lucas values mod 2 (bit-subset test) and mod 5 (digit
        # products) — no length-10^5 Pascal row is ever materialized.
        t = len(s) - 2
        # cm5[a][b] = C(a, b) mod 5 for single base-5 digits
        cm5 = [[0] * 5 for _ in range(5)]
        for a in range(5):
            cm5[a][0] = 1
            for b in range(1, a + 1):
                cm5[a][b] = (cm5[a - 1][b - 1] + cm5[a - 1][b]) % 5
        # crt[r2][r5] = the digit x in 0..9 with x % 2 == r2 and x % 5 == r5
        crt = [[0] * 5 for _ in range(2)]
        for x in range(10):
            crt[x % 2][x % 5] = x
        a = b = 0
        for j, ch in enumerate(s[: t + 1]):
            # Lucas mod 2: C(t, j) is odd iff every bit of j is a bit of t.
            r2 = 0 if j & ~t else 1
            r5, tj, jj = 1, t, j
            while jj:
                r5 = r5 * cm5[tj % 5][jj % 5] % 5
                tj //= 5
                jj //= 5
            c = crt[r2][r5]
            a = (a + c * (ord(ch) - 48)) % 10
            b = (b + c * (ord(s[j + 1]) - 48)) % 10
        return a == b
