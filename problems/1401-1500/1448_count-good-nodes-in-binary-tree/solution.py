from typing import List, Optional


class Solution:
    def goodNodes(self, root: Optional[TreeNode]) -> int:
        count = 0
        # each entry carries the max value along its root-to-node path
        stack = [(root, root.val)]
        while stack:
            node, max_so_far = stack.pop()
            # non-strict: a value equal to the path max is still good; raising
            # max_so_far here means children see the true maximum of their path
            if node.val >= max_so_far:
                count += 1
                max_so_far = node.val
            if node.left:
                stack.append((node.left, max_so_far))
            if node.right:
                stack.append((node.right, max_so_far))
        return count
