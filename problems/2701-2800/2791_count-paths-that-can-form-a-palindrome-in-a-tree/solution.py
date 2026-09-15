from typing import List, Optional


class Solution:
    def countPalindromePaths(self, parent: List[int], s: str) -> int:
        n = len(parent)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parent[i]].append(i)

        masks = [0] * n
        # mask[v]: parity bitmask of letters on the root-to-v path; a
        # multiset forms a palindrome iff at most one parity is odd, so only
        # parities matter. BFS from the root derives each child's mask as its
        # parent's XOR the edge letter's bit.
        order = [0]
        qi = 0
        while qi < len(order):
            v = order[qi]
            qi += 1
            for c in children[v]:
                masks[c] = masks[v] ^ (1 << (ord(s[c]) - ord("a")))
                order.append(c)

        freq = {}
        ans = 0
        for m in masks:
            # Path letters between u and v have parity mask[u] ^ mask[v] —
            # the shared prefix above their LCA cancels — so partners are
            # masks equal to m (all even) or one bit away (single odd).
            ans += freq.get(m, 0)
            for b in range(26):
                ans += freq.get(m ^ (1 << b), 0)
            # Consult before inserting: each unordered pair counted once.
            freq[m] = freq.get(m, 0) + 1
        return ans
