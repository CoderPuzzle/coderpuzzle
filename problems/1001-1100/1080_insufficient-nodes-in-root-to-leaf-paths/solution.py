from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def sufficientSubset(self, root: Optional[TreeNode], limit: int) -> Optional[TreeNode]:
        # Post-order with an explicit stack. Each frame is (node, remaining,
        # parent, is_left, revisited): the first visit pushes the children
        # with the budget reduced by the node's value, and the second visit
        # decides keep-or-prune once the children are pruned in place. A
        # leaf survives iff its value clears the remaining budget; an
        # internal node survives iff at least one child survived.
        stack = [(root, limit, None, False, False)]
        result = None
        while stack:
            node, remaining, parent, is_left, revisited = stack.pop()
            if node is None:
                continue
            if not revisited:
                if node.left is None and node.right is None:
                    if node.val < remaining:
                        if parent is None:
                            result = None
                        elif is_left:
                            parent.left = None
                        else:
                            parent.right = None
                    elif parent is None:
                        result = node
                    continue
                stack.append((node, remaining, parent, is_left, True))
                stack.append((node.right, remaining - node.val, node, False, False))
                stack.append((node.left, remaining - node.val, node, True, False))
            elif node.left is None and node.right is None:
                # Both children were pruned, so no leaf below reaches limit.
                if parent is None:
                    result = None
                elif is_left:
                    parent.left = None
                else:
                    parent.right = None
            elif parent is None:
                result = node
        return result
