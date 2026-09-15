from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def findClosestLeaf(self, root: Optional[TreeNode], k: int) -> int:
        # Distance here runs over the tree's edges as an undirected graph:
        # the nearest leaf may sit in another subtree, up through parents
        # and across the root, so a descending search alone cannot prove a
        # leaf nearest. One breadth-first pass from the root records each
        # node's parent and collects every node, which also locates k.
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
        target = next(node for node in order if node.val == k)

        # A level-synchronized walk from the k node spreads one edge per
        # step through parent, left child, and right child. The first
        # level holding a leaf holds every nearest leaf; the smallest
        # value among them settles the tie rule.
        frontier = [target]
        seen = {target}
        while frontier:
            best = None
            for node in frontier:
                if node.left is None and node.right is None and (best is None or node.val < best):
                    best = node.val
            if best is not None:
                return best
            reached = []
            for node in frontier:
                for neighbor in (parents.get(node), node.left, node.right):
                    if neighbor is not None and neighbor not in seen:
                        seen.add(neighbor)
                        reached.append(neighbor)
            frontier = reached
        raise AssertionError("unreachable: every tree has a leaf")
