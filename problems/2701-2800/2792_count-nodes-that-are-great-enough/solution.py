from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def countGreatEnoughNodes(self, root: Optional[TreeNode], k: int) -> int:
        # Post-order over an explicit stack: each node yields the sorted
        # list of its subtree's min(size, k) smallest values. The pooled
        # child lists plus the node's own value are sorted and truncated,
        # so a full subtree listing is never needed. The kept list reaches
        # length k exactly when the subtree holds at least k nodes, and its
        # last entry is then the subtree's k-th smallest value counted with
        # multiplicity: the node exceeds it iff at least k actual nodes are
        # strictly smaller — duplicates of the node itself never pass.
        great = 0
        if root is None:
            return 0
        smallest = {}
        stack = [(root, False)]
        while stack:
            node, done = stack.pop()
            if node is None:
                continue
            if not done:
                stack.append((node, True))
                stack.append((node.left, False))
                stack.append((node.right, False))
                continue
            pooled = [node.val]
            for child in (node.left, node.right):
                pooled.extend(smallest.pop(child, []))
            pooled.sort()
            del pooled[k:]
            smallest[node] = pooled
            if len(pooled) == k and node.val > pooled[-1]:
                great += 1
        return great
