from typing import List


class Solution:
    def crackSafe(self, n: int, k: int) -> str:
        # Iterative Hierholzer over the de Bruijn graph: nodes are (n-1)-digit
        # strings (as base-k integers), edges are the k^n passwords. Digits are
        # tried in ascending order, matching the reference's deterministic walk.
        total = k**n
        seen = [False] * total
        shift = k ** (n - 1)
        out = []
        node_stack = [0]
        digit_stack = [0]  # digit used to enter each stacked node
        while node_stack:
            node = node_stack[-1]
            nxt = -1
            for x in range(k):
                e = node * k + x
                if not seen[e]:
                    seen[e] = True
                    nxt = x
                    break
            if nxt >= 0:
                node_stack.append((node * k + nxt) % shift)
                digit_stack.append(nxt)
            else:
                node_stack.pop()
                d = digit_stack.pop()
                if node_stack:
                    out.append(str(d))
        return "".join(out) + "0" * (n - 1)
