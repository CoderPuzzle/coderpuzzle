from typing import List


class Solution:
    def minimumCost(self, source: str, target: str, original: List[str], changed: List[str], cost: List[int]) -> int:
        # Give every distinct conversion string an id and run Floyd-Warshall
        # on the minimum operation cost between any two of them; repeated
        # operations on one window then collapse to a shortest path.
        ids = {}
        for s in original + changed:
            ids.setdefault(s, len(ids))
        m = len(ids)
        inf = 1 << 50
        dist = [[inf] * m for _ in range(m)]
        for i in range(m):
            dist[i][i] = 0
        for x, y, c in zip(original, changed, cost):
            ux, uy = ids[x], ids[y]
            if c < dist[ux][uy]:
                dist[ux][uy] = c
        for k in range(m):
            dk = dist[k]
            for i in range(m):
                di = dist[i]
                dik = di[k]
                if dik >= inf:
                    continue
                dist[i] = [d if d < dik + w else dik + w for d, w in zip(di, dk)]

        # A trie over the distinct strings lets one lockstep walk over
        # source/target from each position find every usable segment length.
        trie = {}
        for s, x in ids.items():
            node = trie
            for ch in s:
                node = node.setdefault(ch, {})
            node["$"] = x

        n = len(source)
        dp = [inf] * (n + 1)
        dp[0] = 0
        for j in range(n):
            if dp[j] >= inf:
                continue
            if source[j] == target[j] and dp[j] < dp[j + 1]:
                dp[j + 1] = dp[j]
            snode = trie
            tnode = trie
            for k in range(j, n):
                snode = snode.get(source[k])
                tnode = tnode.get(target[k])
                if snode is None or tnode is None:
                    break
                x = snode.get("$")
                y = tnode.get("$")
                if x is not None and y is not None:
                    nd = dp[j] + dist[x][y]
                    if nd < dp[k + 1]:
                        dp[k + 1] = nd
        return dp[n] if dp[n] < inf else -1
