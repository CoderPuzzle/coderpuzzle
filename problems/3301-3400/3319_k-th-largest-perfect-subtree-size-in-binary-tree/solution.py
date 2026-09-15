from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def kthLargestPerfectSubtree(self, root: Optional[TreeNode], k: int) -> int:
        # One BFS pass records the nodes; walking that order backwards
        # visits children before parents, so sizes propagate bottom-up
        # with no recursion — a chain can run 2000 nodes deep. info[node]
        # is the subtree size when the subtree is perfect, else 0: a
        # perfect internal node needs both children perfect with equal
        # sizes, and a leaf is perfect with size 1.
        order = [root]
        i = 0
        while i < len(order):
            node = order[i]
            i += 1
            if node.left is not None:
                order.append(node.left)
            if node.right is not None:
                order.append(node.right)
        info = {}
        sizes = []
        for node in reversed(order):
            if node.left is None and node.right is None:
                info[node] = 1
            elif (
                node.left is not None
                and node.right is not None
                and info[node.left] > 0
                and info[node.left] == info[node.right]
            ):
                info[node] = 1 + info[node.left] + info[node.right]
            else:
                info[node] = 0
            if info[node]:
                sizes.append(info[node])
        sizes.sort(reverse=True)
        return sizes[k - 1] if k <= len(sizes) else -1
