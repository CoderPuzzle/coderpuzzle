class Solution:
    def numberOfStableArrays(self, zero: int, one: int, limit: int) -> int:
        MOD = 10**9 + 7
        # Count prefixes by usage and last character: f0[a][b] ends in 0,
        # f1[a][b] ends in 1. Each new character extends some block of at
        # most `limit` copies; looping over block lengths collapses into a
        # sliding window over pref0, the row-wise prefix sums of f0, which
        # keeps the whole build bottom-up and iterative.
        f0 = [[0] * (one + 1) for _ in range(zero + 1)]
        f1 = [[0] * (one + 1) for _ in range(zero + 1)]
        pref0 = [[0] * (one + 2) for _ in range(zero + 1)]
        for a in range(1, min(limit, zero) + 1):
            f0[a][0] = 1  # all-zero openers shorter than or equal to limit
            pref0[a][1] = 1
        for b in range(1, one + 1):
            low = max(0, b - limit)
            # close a zero-block of some length k <= limit after a
            # one-ending prefix: the k-loop is the window below
            for a in range(zero + 1):
                if a == 0:
                    f1[a][b] = 1 if b <= limit else 0  # all-one opener
                else:
                    f1[a][b] = (pref0[a][b] - pref0[a][low]) % MOD
            # close a one-block of length k <= limit after a zero-ending
            # prefix taken from column b itself
            running = 0
            for a in range(1, zero + 1):
                running += f1[a - 1][b]
                if a - limit - 1 >= 0:
                    running -= f1[a - limit - 1][b]
                f0[a][b] = running % MOD
            for a in range(zero + 1):
                pref0[a][b + 1] = (pref0[a][b] + f0[a][b]) % MOD
        return (f0[zero][one] + f1[zero][one]) % MOD
