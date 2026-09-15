from typing import Optional


class Solution:
    def maxProduct(self, root: Optional[TreeNode]) -> int:
        # Iterative post-order computes every subtree sum (a 5*10^4 chain
        # would overflow any recursion budget); each non-root sum s then
        # scores the cut s * (total - s), maximized before the modulo.
        sums = {}

        def subtree(node) -> int:
            total = 0
            stack = [(node, False)]
            while stack:
                cur, expanded = stack.pop()
                if cur is None:
                    continue
                if expanded:
                    total = cur.val + sums.get(cur.left, 0) + sums.get(cur.right, 0)
                    sums[cur] = total
                else:
                    stack.append((cur, True))
                    stack.append((cur.left, False))
                    stack.append((cur.right, False))
            return total

        total = subtree(root)
        best = 0
        for node, part in sums.items():
            if node is not root:
                best = max(best, part * (total - part))
        return best % (10**9 + 7)
