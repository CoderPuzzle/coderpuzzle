from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def splitBST(self, root: Optional[TreeNode], target: int) -> List[Optional[TreeNode]]:
        # The split boundary is one root-to-null path: step right whenever
        # a node's value is at most target, left whenever it is greater.
        # Only the nodes on that path ever change children — every subtree
        # hanging off it keeps its parent, which is exactly the structure
        # preservation the statement demands.
        small = TreeNode()
        large = TreeNode()
        # Two dangling tails mark where the next path node on each side
        # must attach. A node <= target joins the first tree, and the next
        # small-side node on the path is always its right descendant, so
        # the tail advances to its freshly emptied right child; a node
        # > target mirrors this on the left. One walk, no recursion, two
        # sentinel nodes — the whole working set.
        small_tail, large_tail = small, large
        node = root
        while node is not None:
            if node.val <= target:
                following = node.right
                node.right = None
                small_tail.right = node
                small_tail = node
            else:
                following = node.left
                node.left = None
                large_tail.left = node
                large_tail = node
            node = following
        return [small.right, large.left]
