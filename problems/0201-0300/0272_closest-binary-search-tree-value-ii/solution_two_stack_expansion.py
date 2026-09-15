from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def closestKValues(self, root: Optional[TreeNode], target: float, k: int) -> List[int]:
        # One descent from the root sorts the tree around target. A node at
        # or below target is a candidate predecessor and anything nearer to
        # target on that side lives in its right subtree, so the walk steps
        # right after pushing it; a node above target mirrors onto the
        # successor stack and steps left. Each stack ends with its side's
        # nearest value on top, the rest of the side ordered underneath.
        predecessors = []
        successors = []
        node = root
        while node is not None:
            if node.val <= target:
                predecessors.append(node)
                node = node.right
            else:
                successors.append(node)
                node = node.left
        # Each pick pops the nearer top — a tie goes to the predecessor,
        # which holds the smaller value — then restores its stack by pushing
        # the popped node's inner spine: the right edge of a predecessor's
        # left subtree, the left edge of a successor's right subtree. Each
        # side sweeps outward from target one value at a time, so picks come
        # out ordered exactly as the statement pins them.
        result = []
        for _ in range(k):
            if not successors or (
                predecessors and abs(predecessors[-1].val - target) <= abs(successors[-1].val - target)
            ):
                node = predecessors.pop()
                result.append(node.val)
                child = node.left
                while child is not None:
                    predecessors.append(child)
                    child = child.right
            else:
                node = successors.pop()
                result.append(node.val)
                child = node.right
                while child is not None:
                    successors.append(child)
                    child = child.left
        return result
