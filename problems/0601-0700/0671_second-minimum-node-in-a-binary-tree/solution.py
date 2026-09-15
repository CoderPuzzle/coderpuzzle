from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def findSecondMinimumValue(self, root: Optional[TreeNode]) -> int:
        # The min property makes root.val the minimum of the whole tree:
        # a parent is the smaller of its children, so every value below
        # the root is >= the root's own. The second minimum is therefore
        # the smallest value strictly greater than root.val. The walk
        # descends only through nodes that still carry the root's value —
        # a node with a larger value is itself the best its whole subtree
        # can offer (everything beneath it is at least as large), so it
        # is taken as a candidate and its subtree is pruned. best starts
        # at -1, which no node value can equal (values are >= 1), so it
        # doubles as the fallback answer.
        root_value = root.val
        best = -1
        stack = [root]
        while stack:
            node = stack.pop()
            if node.val == root_value:
                # 0 or 2 children: one null check settles both pushes.
                if node.left is not None:
                    stack.append(node.left)
                    stack.append(node.right)
            elif best == -1 or node.val < best:
                best = node.val
        return best
