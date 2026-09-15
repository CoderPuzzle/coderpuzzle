from collections import deque
from typing import List


class Solution:
    def minValidStrings(self, words: List[str], target: str) -> int:
        # dp[p] is the minimum number of valid strings forming target[:p];
        # dp[0] is 0 and every other cell starts out unreachable. An
        # Aho-Corasick automaton over words turns one left-to-right scan of
        # target into, at each index j, the length of the longest suffix of
        # target[:j + 1] that is a prefix of some word: every automaton state
        # lies on a trie path, so that length is simply the state's depth. A
        # piece ending at j + 1 therefore starts somewhere inside its last r
        # positions, and a min segment tree over finalized dp cells answers
        # each such window in O(log n): point-update dp[j + 1], then move on.
        # The scan stops dead the moment a character extends no word prefix at
        # all - nothing beyond that position is reachable, so the answer is
        # -1 unless the full length was formed.
        children = [dict()]
        fail = [0]
        for word in words:
            cur = 0
            for ch in word:
                nxt = children[cur].get(ch)
                if nxt is None:
                    children.append({})
                    fail.append(0)
                    nxt = len(children) - 1
                    children[cur][ch] = nxt
                cur = nxt
        queue = deque(children[0].values())
        while queue:
            u = queue.popleft()
            for ch, v in children[u].items():
                f = fail[u]
                while f and ch not in children[f]:
                    f = fail[f]
                nf = children[f].get(ch, 0)
                fail[v] = 0 if nf == v else nf
                queue.append(v)
        depth = [0] * len(children)
        for u, edges in enumerate(children):
            for v in edges.values():
                depth[v] = depth[u] + 1
        n = len(target)
        inf = 1 << 30
        size = 1
        while size < n + 2:
            size <<= 1
        tree = [inf] * (2 * size)

        def update(i, value):
            i += size
            tree[i] = value
            i >>= 1
            while i:
                tree[i] = min(tree[2 * i], tree[2 * i + 1])
                i >>= 1

        def query(lo, hi):
            res = inf
            lo += size
            hi += size
            while lo < hi:
                if lo & 1:
                    res = min(res, tree[lo])
                    lo += 1
                if hi & 1:
                    hi -= 1
                    res = min(res, tree[hi])
                lo >>= 1
                hi >>= 1
            return res

        update(0, 0)
        cur = 0
        for j in range(n):
            ch = target[j]
            while cur and ch not in children[cur]:
                cur = fail[cur]
            cur = children[cur].get(ch, 0)
            if cur == 0:
                return -1
            best = query(max(0, j + 1 - depth[cur]), j + 1)
            if best != inf:
                update(j + 1, best + 1)
        ans = query(n, n + 1)
        return -1 if ans >= inf else ans
