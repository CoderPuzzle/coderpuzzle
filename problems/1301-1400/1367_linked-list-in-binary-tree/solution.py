from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def isSubPath(self, head: Optional[ListNode], root: Optional[TreeNode]) -> bool:
        # Flatten the list once so matching works with plain indices.
        values = []
        node = head
        while node:
            values.append(node.val)
            node = node.next

        if not root:
            return False

        # Walk the whole tree; from every node that starts a match, follow it
        # downward with an explicit (node, index) stack.
        stack = [root]
        while stack:
            tree_node = stack.pop()
            if self._match(tree_node, values):
                return True
            for child in (tree_node.left, tree_node.right):
                if child:
                    stack.append(child)
        return False

    def _match(self, start: TreeNode, values: List[int]) -> bool:
        if not values or start.val != values[0]:
            return False
        stack = [(start, 0)]
        while stack:
            node, index = stack.pop()
            if index + 1 == len(values):
                return True
            nxt = values[index + 1]
            for child in (node.left, node.right):
                if child and child.val == nxt:
                    stack.append((child, index + 1))
        return False
