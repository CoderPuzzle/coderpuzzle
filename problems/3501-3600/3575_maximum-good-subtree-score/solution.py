from typing import List, Optional

MOD = 10**9 + 7
NEG = -(10**18)


class Solution:
    def goodSubtreeSum(self, vals: List[int], par: List[int]) -> int:
        n = len(vals)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[par[i]].append(i)

        def digit_mask(x):
            mask = 0
            for ch in str(x):
                mask |= 1 << (ord(ch) - 48)
            return mask

        def distinct_digits(x):
            s = str(x)
            return len(set(s)) == len(s)

        umask = [digit_mask(v) for v in vals]
        selectable = [distinct_digits(v) for v in vals]

        def subset_convolve(a, b):
            # res[c] = max over x subset of c of a[x] + b[c^x]
            res = [NEG] * 1024
            for c in range(1024):
                best = NEG
                x = c
                while True:
                    y = c ^ x
                    v = a[x] + b[y]
                    if v > best:
                        best = v
                    if x == 0:
                        break
                    x = (x - 1) & c
                res[c] = best
            return res

        # post-order
        order = []
        stack = [0]
        while stack:
            u = stack.pop()
            order.append(u)
            for v in children[u]:
                stack.append(v)

        dp = [None] * n
        total = 0
        for u in reversed(order):
            comb = [NEG] * 1024
            comb[0] = 0
            for c in children[u]:
                comb = subset_convolve(comb, dp[c])

            du = comb[:]
            if selectable[u]:
                mu = umask[u]
                # select u: digits must be disjoint from children's; combined mask contains mu
                for mask in range(1024):
                    if (mask & mu) == mu:
                        rest = mask ^ mu
                        if comb[rest] != NEG:
                            val = comb[rest] + vals[u]
                            if val > du[mask]:
                                du[mask] = val
            dp[u] = du
            total += max(du)
        return total % MOD
