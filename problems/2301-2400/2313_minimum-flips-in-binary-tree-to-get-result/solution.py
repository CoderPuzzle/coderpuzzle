from typing import List, Optional
from collections import deque


class Solution:
    def minimumFlips(self, root: Optional[TreeNode], result: bool) -> int:
        if root is None:
            return 0
        order = []
        dq = deque([root])
        while dq:
            node = dq.popleft()
            order.append(node)
            if node.left:
                dq.append(node.left)
            if node.right:
                dq.append(node.right)
        idx = {node: i for i, node in enumerate(order)}
        n = len(order)
        # t[i] / f[i] = min flips to make subtree i true / false; the pair is
        # the whole DP state, and reverse BFS order finalizes children first
        t = [0] * n
        f = [0] * n
        for i in range(n - 1, -1, -1):
            node = order[i]
            v = node.val
            if node.left is None and node.right is None:
                # leaf base: (0, 1) if already true, (1, 0) if already false
                t[i], f[i] = (0, 1) if v == 1 else (1, 0)
            elif v == 5:
                # NOT: swap the single child's two costs
                child = node.left if node.left is not None else node.right
                ci = idx[child]
                t[i], f[i] = f[ci], t[ci]
            else:
                li = idx[node.left]
                ri = idx[node.right]
                lt, lf = t[li], f[li]
                rt, rf = t[ri], f[ri]
                if v == 2:
                    # OR: true if either child is true; false only if both are
                    t[i], f[i] = min(lt, rt), lf + rf
                elif v == 3:
                    # AND: mirror of OR - true needs both children true
                    t[i], f[i] = lt + rt, min(lf, rf)
                else:
                    # XOR: true when the children differ, false when they match
                    t[i], f[i] = min(lt + rf, lf + rt), min(lt + rt, lf + rf)
        ri = idx[root]
        return t[ri] if result else f[ri]
