from typing import List


class Solution:
    def distinctPaths(self, n: int, parent: List[int], gates: List[List[int]], queries: List[List[int]]) -> int:
        MOD = 1_000_000_007
        LOG = max(1, (n - 1).bit_length())

        # Iterative depth assignment (the tree may be one long chain).
        depth = [-1] * n
        depth[0] = 0
        for u in range(n):
            if depth[u] >= 0:
                continue
            path = []
            cur = u
            while depth[cur] < 0:
                path.append(cur)
                cur = parent[cur]
            d = depth[cur]
            for node in reversed(path):
                d += 1
                depth[node] = d

        # up[k][u]: 2^k-th ancestor (root-saturating); w[k][u]: row-major
        # product of the card-transition matrices of every node departed on
        # that jump -- the leg leaving node u uses the gates of u itself.
        up0 = parent[:]
        up0[0] = 0
        base = [0] * (4 * n)
        for u in range(1, n):
            r, b, w = gates[u]
            off = 4 * u
            base[off] = b % MOD
            base[off + 1] = w % MOD
            base[off + 2] = w % MOD
            base[off + 3] = r % MOD
        base[0], base[1], base[2], base[3] = 1, 0, 0, 1
        ups = [up0]
        mats = [base]
        for _ in range(1, LOG):
            pu, pw = ups[-1], mats[-1]
            cu = [0] * n
            cw = [0] * (4 * n)
            for u in range(n):
                mid = pu[u]
                cu[u] = pu[mid]
                i, j = 4 * u, 4 * mid
                a, b, c, d = pw[i], pw[i + 1], pw[i + 2], pw[i + 3]
                e, f, g, h = pw[j], pw[j + 1], pw[j + 2], pw[j + 3]
                cw[i] = (a * e + b * g) % MOD
                cw[i + 1] = (a * f + b * h) % MOD
                cw[i + 2] = (c * e + d * g) % MOD
                cw[i + 3] = (c * f + d * h) % MOD
            ups.append(cu)
            mats.append(cw)

        def leg_product(src: int, stop_depth: int):
            """Matrix product of the legs from src up to (excluding) stop_depth."""
            acc0, acc1, acc2, acc3 = 1, 0, 0, 1
            cur = src
            k = LOG - 1
            while depth[cur] > stop_depth:
                while depth[ups[k][cur]] < stop_depth:
                    k -= 1
                wk = mats[k]
                i = 4 * cur
                a, b, c, d = wk[i], wk[i + 1], wk[i + 2], wk[i + 3]
                acc0, acc1, acc2, acc3 = (
                    (acc0 * a + acc1 * c) % MOD,
                    (acc0 * b + acc1 * d) % MOD,
                    (acc2 * a + acc3 * c) % MOD,
                    (acc2 * b + acc3 * d) % MOD,
                )
                cur = ups[k][cur]
            return acc0, acc1, acc2, acc3

        top = LOG - 1
        answer = 0
        for anode, acard, bnode, bcard in queries:
            a, b = anode, bnode
            da, db = depth[a], depth[b]
            if da < db:
                a, b = b, a
                da, db = db, da
            diff = da - db
            while diff:
                k = diff.bit_length() - 1
                a = ups[k][a]
                diff &= (1 << k) - 1
            if a == b:
                lca = a
            else:
                for k in range(top, -1, -1):
                    uk = ups[k]
                    if uk[a] != uk[b]:
                        a, b = uk[a], uk[b]
                lca = ups[0][a]

            ra = leg_product(anode, depth[lca])
            rb = leg_product(bnode, depth[lca])
            wa = (ra[2 * acard] + ra[2 * acard + 1]) % MOD
            wb = (rb[2 * bcard] + rb[2 * bcard + 1]) % MOD
            answer ^= (wa * wb) % MOD
        return answer
