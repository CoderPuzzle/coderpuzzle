from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   Node:      .val int, .children list[Node]; the tree arrives as its node list


class Solution:
    def findRoot(self, tree: List[Node]) -> Optional[Node]:
        # Value cancellation: every non-root appears exactly once as someone's
        # child, so summing every node's value and subtracting every child's
        # value cancels everything except the root's value. A second scan
        # turns that surviving value back into its node — no extra
        # collection is kept at any point.
        total = 0
        for node in tree:
            total += node.val
            for child in node.children:
                total -= child.val
        for node in tree:
            if node.val == total:
                return node
        return None
