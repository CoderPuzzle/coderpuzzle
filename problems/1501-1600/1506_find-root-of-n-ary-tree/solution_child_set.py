from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   Node:      .val int, .children list[Node]; the tree arrives as its node list


class Solution:
    def findRoot(self, tree: List[Node]) -> Optional[Node]:
        # Indegree zero: every node except the root appears exactly once as
        # someone's child. Collect all the nodes, then discard every node
        # seen as a child — the one survivor is the root.
        survivors = set(tree)
        for node in tree:
            for child in node.children:
                survivors.discard(child)
        for node in survivors:
            return node
        return None
