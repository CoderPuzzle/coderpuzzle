from typing import List, Optional
from itertools import product


class Solution:
    def colorTheGrid(self, m: int, n: int) -> int:
        MOD = 10**9 + 7

        # Enumerate the at most 3*2^(m-1)=48 column states: every valid
        # coloring of one column has vertically adjacent rows differing.
        states = [col for col in product(range(3), repeat=m) if all(col[i] != col[i + 1] for i in range(m - 1))]
        # Two columns may be adjacent exactly when they differ in every row;
        # precompute that compatibility table once.
        compat = [[j for j in range(len(states)) if all(x != y for x, y in zip(col_a, states[j]))] for col_a in states]

        # All ones: the first column can take any valid coloring (this also
        # makes n=1 fall out with the loop body never running).
        cur = [1] * len(states)
        for _ in range(n - 1):
            nxt = [0] * len(states)
            for i, c in enumerate(cur):
                if c:  # skip zero-count states as a constant-factor saving
                    for j in compat[i]:
                        nxt[j] = (nxt[j] + c) % MOD
            cur = nxt
        # The last column may end in any state, so sum the whole vector.
        return sum(cur) % MOD
