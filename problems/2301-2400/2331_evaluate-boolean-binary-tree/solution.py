from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def evaluateTree(self, root: Optional[TreeNode]) -> bool:
        # The tree is a formula: leaves hold the literals (1 is true, 0
        # is false) and internal nodes apply their operator — 2 ORs the
        # two child bits, 3 ANDs them — so the answer is a post-order
        # fold. Spines of this tree can run hundreds of nodes deep, so
        # the fold runs on explicit stacks instead of the call stack:
        # entries say either "expand this node" or "apply this
        # operator". Expanding an internal node parks its operator
        # beneath its children, left on top; because the tree is full,
        # each subtree's entries net out to exactly one bit, so an
        # operator resurfaces only after its two operands sit ready on
        # the operand shelf.
        if root is None:
            return False
        operands: List[bool] = []
        work = [("expand", root)]
        while work:
            kind, item = work.pop()
            if kind == "expand":
                node = item
                if node.left is None or node.right is None:
                    operands.append(node.val == 1)
                else:
                    work.append(("apply", node.val == 2))
                    work.append(("expand", node.right))
                    work.append(("expand", node.left))
            else:
                is_or = item
                right = operands.pop()
                left = operands.pop()
                operands.append((left or right) if is_or else (left and right))
        return operands.pop()
