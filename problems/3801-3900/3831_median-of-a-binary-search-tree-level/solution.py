from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def levelMedian(self, root: Optional[TreeNode], level: int) -> int:
        # Descend one frontier at a time: every pass replaces the current
        # level's nodes with their children, so after `level` passes the
        # frontier IS the queried level. If it empties first, that level
        # does not exist and -1 is the answer. Plain loops over an
        # explicit frontier — no recursion — so a 200,000-node chain is
        # as safe as a bushy tree.
        frontier = [root] if root is not None else []
        for _ in range(level):
            if not frontier:
                break
            frontier = [c for node in frontier for c in (node.left, node.right) if c is not None]
        if not frontier:
            return -1
        # The upper median sits at index len // 2 of the sorted level
        # values: the exact middle for odd counts, the larger of the two
        # middle elements for even counts.
        values = sorted(node.val for node in frontier)
        return values[len(values) // 2]
