from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:
        # An inorder walk of a BST emits values in ascending order, and a
        # sorted sequence keeps its closest pair next to each other: for any
        # two values with a third between them, that middle value is closer
        # to one end than the outer pair is wide. The minimum absolute
        # difference is therefore always a gap between consecutively visited
        # values, and one pass holding just the previously emitted value
        # sees every candidate. The traversal carries its own stack of
        # nodes: the tree may be a single 10^4-node chain, whose walk would
        # nest 10000 calls — past CPython's default recursion limit and over
        # the 512k stacks the judge hands Java and Node — so every runtime
        # iterates instead.
        best: Optional[int] = None
        prev: Optional[int] = None
        stack: List[TreeNode] = []
        current = root
        while current is not None or stack:
            # Descend the left spine stacking every node, then visit each
            # popped node and descend its right child.
            while current is not None:
                stack.append(current)
                current = current.left
            current = stack.pop()
            if prev is not None:
                gap = current.val - prev
                if best is None or gap < best:
                    best = gap
            prev = current.val
            current = current.right
        return best
