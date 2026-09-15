from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def distanceK(self, root: Optional[TreeNode], target: int, k: int) -> List[int]:
        # Distance k counts edges on paths that may climb through parents as
        # well as descend through children, so the answer can spill out of
        # the target's own subtree — a downward search alone cannot reach
        # it. One breadth-first pass from the root records each node's
        # parent and collects every node, which also locates the node
        # carrying the target value.
        parents = {}
        order = []
        if root is not None:
            order.append(root)
        head = 0
        while head < len(order):
            node = order[head]
            head += 1
            for child in (node.left, node.right):
                if child is not None:
                    parents[child] = node
                    order.append(child)
        start = next(node for node in order if node.val == target)

        # A level-synchronized walk from the target spreads one edge per
        # step through parent, left child, and right child, never
        # revisiting a node, so after k steps the frontier holds exactly
        # the nodes at distance k. Sorting the collected values settles
        # the ascending output order the statement pins.
        frontier = [start]
        seen = {start}
        for _ in range(k):
            reached = []
            for node in frontier:
                for neighbor in (parents.get(node), node.left, node.right):
                    if neighbor is not None and neighbor not in seen:
                        seen.add(neighbor)
                        reached.append(neighbor)
            frontier = reached
            if not frontier:
                break
        result = [node.val for node in frontier]
        result.sort()
        return result
