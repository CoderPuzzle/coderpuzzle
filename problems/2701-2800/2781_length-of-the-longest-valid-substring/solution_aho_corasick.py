class Solution:
    def longestValidSubstring(self, word: str, forbidden: list[str]) -> int:
        miss = 1 << 30  # "no forbidden string ends at this node"
        # Aho-Corasick automaton over the forbidden strings. Children live in
        # one dict keyed node * 32 + char, so memory tracks the trie's edge
        # count instead of any alphabet-wide table.
        children = {}
        fail = [0]
        best = [miss]  # shortest forbidden suffix ending at each node
        parent = [0]
        pch = [0]
        max_len = max((len(s) for s in forbidden), default=0)
        levels = [[] for _ in range(max_len + 1)]
        for s in forbidden:
            cur = 0
            for i, ch in enumerate(s):
                c = ord(ch) - 97
                key = (cur << 5) | c
                nxt = children.get(key)
                if nxt is None:
                    nxt = len(fail)
                    children[key] = nxt
                    fail.append(0)
                    best.append(miss)
                    parent.append(cur)
                    pch.append(c)
                    levels[i + 1].append(nxt)
                cur = nxt
            best[cur] = min(best[cur], len(s))
        # Failure links, breadth-first over depth buckets: fail[u] is the
        # longest proper suffix of u's path that is also a trie path. Folding
        # best along each link tells every node the shortest forbidden string
        # ending there, with no occurrence enumeration at scan time.
        for depth in range(1, max_len + 1):
            for u in levels[depth]:
                c = pch[u]
                f = fail[parent[u]]
                while f and ((f << 5) | c) not in children:
                    f = fail[f]
                v = children.get((f << 5) | c, 0)
                fail[u] = 0 if v == u else v
                best[u] = min(best[u], best[fail[u]])
        n = len(word)
        left = 0
        ans = 0
        state = 0
        # Longest-match scan: the state is always the longest suffix of the
        # text that prefixes some forbidden string, so each character costs
        # one amortized-constant hop instead of the window variant's L probes.
        # Fail walks never move the text pointer, and depth grows by at most
        # one per character, so the walks amortize away.
        for right in range(n):
            c = ord(word[right]) - 97
            while state and ((state << 5) | c) not in children:
                state = fail[state]
            state = children.get((state << 5) | c, 0)
            # The shortest forbidden suffix ending at right starts latest --
            # exactly the match the window variant jumps at -- so hopping the
            # left end past its first character keeps the same sweep.
            m = best[state]
            if m != miss:
                left = max(left, right - m + 2)
            ans = max(ans, right - left + 1)
        return ans
