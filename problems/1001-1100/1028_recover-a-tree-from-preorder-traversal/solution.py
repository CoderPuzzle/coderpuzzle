from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def recoverFromPreorder(self, traversal: str) -> Optional[TreeNode]:
        # Parse the string into (depth, value) pairs: a run of dashes gives
        # the depth, then a run of digits gives the value (values are
        # guaranteed positive, so no '-' ever appears inside a digit run).
        n = len(traversal)
        i = 0
        stack = []
        while i < n:
            depth = 0
            while i < n and traversal[i] == "-":
                depth += 1
                i += 1
            j = i
            while j < n and traversal[j].isdigit():
                j += 1
            value = int(traversal[i:j])
            i = j
            # The node at this depth replaces everything deeper than it on
            # the current path; whatever remains on top is its parent.
            while len(stack) > depth:
                stack.pop()
            node = TreeNode(value)
            if stack:
                parent = stack[-1]
                if parent.left is None:
                    parent.left = node
                else:
                    parent.right = node
            stack.append(node)
        return stack[0] if stack else None
