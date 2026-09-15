from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def findLeaves(self, root: Optional[TreeNode]) -> List[List[int]]:
        groups: List[List[int]] = []

        # Post-order: each node reports the height of its subtree (a leaf is
        # height 0) and files its own value into that height's group as the
        # recursion unwinds — collecting leaves round by round is just
        # sorting the nodes by height, and finishing the left subtree before
        # entering the right one pins each group to left-to-right order.
        def height(node: Optional[TreeNode]) -> int:
            if node is None:
                return -1
            node_height = 1 + max(height(node.left), height(node.right))
            # A first sighting of a height always arrives after every smaller
            # height has been seen, so this grows the list by exactly one.
            if node_height == len(groups):
                groups.append([])
            groups[node_height].append(node.val)
            return node_height

        height(root)
        return groups
