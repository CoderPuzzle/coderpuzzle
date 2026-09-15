class Solution:
    def minOperations(self, s1: str, s2: str, x: int) -> int:
        # Only mismatched positions need a net flip, and both operations flip
        # exactly two positions, so an odd mismatch count is impossible.
        diffs = [i for i in range(len(s1)) if s1[i] != s2[i]]
        m = len(diffs)
        if m % 2:
            return -1
        INF = 1 << 30
        # pending[i][c]: mismatches before i are resolved, mismatch i is not,
        # and c = 1 when an already-paid x-op covers one future mismatch for
        # free. The credit may stay open across other pairs — nesting an
        # x-pair around an adjacent chain is exactly what beats pairing
        # consecutive mismatches when x is small.
        pending = [[INF, INF] for _ in range(m + 1)]
        pending[0][0] = 0
        for i in range(m):
            free, credited = pending[i]
            # Close a credit: mismatch i flips free with the earlier partner.
            if credited < pending[i + 1][0]:
                pending[i + 1][0] = credited
            # Open a credit: pay x, mismatch i pairs with a later mismatch.
            if free + x < pending[i + 1][1]:
                pending[i + 1][1] = free + x
            if i + 2 <= m:
                pair = min(x, diffs[i + 1] - diffs[i])
                if free + pair < pending[i + 2][0]:
                    pending[i + 2][0] = free + pair
                if credited + pair < pending[i + 2][1]:
                    pending[i + 2][1] = credited + pair
        return pending[m][0]
