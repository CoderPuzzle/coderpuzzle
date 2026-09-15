from operator import mul


class Solution:
    def zigZagArrays(self, n: int, l: int, r: int) -> int:
        MOD = 1_000_000_007
        m = r - l + 1
        # Reflecting the range (x -> l + r - x) swaps "next step must rise"
        # with "must fall" while fixing the all-ones start, so the falling
        # block always mirrors the rising one and one block evolves alone:
        # by the matrix S with S[w][u] = 1 exactly when u + w <= m - 2.
        S = [[1 if u + w <= m - 2 else 0 for u in range(m)] for w in range(m)]
        v = [1] * m
        k = n - 1
        while k > 0:
            if k & 1:
                v = [sum(map(mul, row, v)) % MOD for row in S]
            k >>= 1
            if k > 0:
                # S[w][u] depends only on w + u, so S is symmetric and stays
                # symmetric under powers: square it as its Gram matrix, one
                # triangle at a time.
                G = [[0] * m for _ in range(m)]
                for i in range(m):
                    Si = S[i]
                    Gi = G[i]
                    for j in range(i, m):
                        Gi[j] = sum(map(mul, Si, S[j])) % MOD
                        G[j][i] = Gi[j]
                S = G
        # The mirrored block doubles the surviving block's mass.
        return 2 * sum(v) % MOD
