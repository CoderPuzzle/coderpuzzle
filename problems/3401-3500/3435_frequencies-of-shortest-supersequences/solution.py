from typing import List, Optional


class Solution:
    def supersequences(self, words: List[str]) -> List[List[int]]:
        chars = set()
        edges = []
        for w in words:
            a, b = w[0], w[1]
            chars.add(a)
            chars.add(b)
            edges.append((a, b))
        chars = sorted(chars)
        m = len(chars)
        idx = {c: i for i, c in enumerate(chars)}
        forced = 0
        for a, b in edges:
            if a == b:
                forced |= 1 << idx[a]
        non_self = [(idx[a], idx[b]) for a, b in edges if a != b]

        def is_dag(t):
            # Induced subgraph on chars not in t must be acyclic.
            adj = [[] for _ in range(m)]
            for a, b in non_self:
                if not (t >> a) & 1 and not (t >> b) & 1:
                    adj[a].append(b)
            state = [0] * m  # 0 unvisited, 1 visiting, 2 done

            def dfs(c):
                state[c] = 1
                for nxt in adj[c]:
                    if state[nxt] == 1:
                        return True
                    if state[nxt] == 0 and dfs(nxt):
                        return True
                state[c] = 2
                return False

            for c in range(m):
                if (t >> c) & 1:
                    continue
                if state[c] == 0 and dfs(c):
                    return False
            return True

        best_len = None
        results = []
        for mask in range(1 << m):
            if (forced & mask) != forced:
                continue
            if not is_dag(mask):
                continue
            length = m + bin(mask).count("1")
            freq = [0] * 26
            for i, c in enumerate(chars):
                freq[ord(c) - ord("a")] = 2 if (mask >> i) & 1 else 1
            if best_len is None or length < best_len:
                best_len = length
                results = [freq]
            elif length == best_len:
                results.append(freq)

        results.sort()
        out = []
        for f in results:
            if not out or f != out[-1]:
                out.append(f)
        return out
