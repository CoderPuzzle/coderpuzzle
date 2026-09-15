from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def getDirections(self, root: Optional[TreeNode], startValue: int, destValue: int) -> str:
        parent = {root.val: 0}
        incoming = {}
        stack = [root]
        while stack:
            node = stack.pop()
            if node.left is not None:
                parent[node.left.val] = node.val
                incoming[node.left.val] = "L"
                stack.append(node.left)
            if node.right is not None:
                parent[node.right.val] = node.val
                incoming[node.right.val] = "R"
                stack.append(node.right)

        distance = {}
        node = startValue
        steps = 0
        while node != 0:
            distance[node] = steps
            node = parent[node]
            steps += 1

        downward = []
        node = destValue
        while node not in distance:
            downward.append(incoming[node])
            node = parent[node]
        downward.reverse()
        return "U" * distance[node] + "".join(downward)
