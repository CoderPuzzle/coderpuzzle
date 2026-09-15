from typing import Dict, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        if root is None:
            # The empty tree has no node whose children could disagree.
            return True
        # Bottom-up height check: `heights` maps each node to its subtree
        # height, or to -1 once an imbalance is found anywhere inside it.
        heights: Dict[TreeNode, int] = {}
        # Explicit post-order stack: a node is settled only after both of
        # its children's heights are known — no recursion, so a 5000-node
        # skewed chain cannot overflow any call stack.
        stack = [root]
        while stack:
            node = stack[-1]
            left, right = node.left, node.right
            if (left is None or left in heights) and (right is None or right in heights):
                stack.pop()
                left_height = heights.get(left, 0)
                right_height = heights.get(right, 0)
                # -1 propagates: a subtree that contains an imbalance can
                # never regain balance higher up, so it fails every ancestor.
                if left_height == -1 or right_height == -1 or abs(left_height - right_height) > 1:
                    heights[node] = -1
                else:
                    heights[node] = 1 + max(left_height, right_height)
            else:
                if left is not None and left not in heights:
                    stack.append(left)
                if right is not None and right not in heights:
                    stack.append(right)
        return heights[root] != -1
