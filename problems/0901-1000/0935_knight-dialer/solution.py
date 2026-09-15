class Solution:
    def knightDialer(self, n: int) -> int:
        # counts[d] is the number of distinct numbers of the current length
        # that end on digit d. Every cell seeds one number of length 1, and
        # each pass pushes every count through the knight's hop list — a
        # number ending on d extends by one hop to each knight-neighbor of
        # d — so n - 1 passes grow the row to length n and the row sum is
        # the answer. Cell 5 has no knight-neighbor, so it seeds length 1
        # and never extends again.
        MOD = 10**9 + 7
        hops = [(4, 6), (6, 8), (7, 9), (4, 8), (0, 3, 9), (), (0, 1, 7), (2, 6), (1, 3), (2, 4)]
        counts = [1] * 10
        for _ in range(n - 1):
            nxt = [0] * 10
            for d, row in enumerate(hops):
                for e in row:
                    nxt[e] = (nxt[e] + counts[d]) % MOD
            counts = nxt
        return sum(counts) % MOD
