from typing import Dict, List, Optional, Tuple


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def subtreeWithAllDeepest(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # A node can only be judged once both of its children's heights
        # are known, so the walk is post-order — children before the node
        # — on an explicit stack of (node, measured) pairs: the first pop
        # pushes the node's own merge beneath its two children, and that
        # merge — the second pop — can only fire once both subtrees are
        # measured. Iterating keeps a 500-node chain's ~500 merges off the
        # call stack instead of spending half of CPython's default 1000
        # frames on them.
        if root is None:
            return None
        heights: Dict[TreeNode, int] = {}
        smallest: Dict[TreeNode, TreeNode] = {}
        stack: List[Tuple[TreeNode, bool]] = [(root, False)]
        while stack:
            node, measured = stack.pop()
            if not measured:
                stack.append((node, True))
                if node.left is not None:
                    stack.append((node.left, False))
                if node.right is not None:
                    stack.append((node.right, False))
                continue
            lh = heights[node.left] if node.left is not None else 0
            rh = heights[node.right] if node.right is not None else 0
            heights[node] = 1 + max(lh, rh)
            # Equal heights: each side reaches this subtree's deepest
            # level, so its deepest nodes sit on both sides and only this
            # node covers them all — it is the subtree's answer. Unequal:
            # no deepest node can live in the shallower side, so the
            # deeper side's answer passes through unchanged.
            if lh == rh:
                smallest[node] = node
            else:
                smallest[node] = smallest[node.left if lh > rh else node.right]
        return smallest[root]
