from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def countPairs(self, root: Optional[TreeNode], distance: int) -> int:
        # Every good pair's path bends at its lowest common ancestor, so
        # counting pairs reduces to counting, at each node, how many ways a
        # leaf on one side meets a leaf on the other within budget. Postorder
        # gives each node its children's answers first: a table indexed by
        # relative depth (0..distance) counting leaves that many edges
        # below. The tree can hold up to 2^10 nodes and a skewed instance
        # packs them into one chain — deep enough to blow past CPython's
        # default recursion limit of 1000 — so both the traversal and the
        # merge run off explicit stacks instead of the call stack.

        # Build the "root, right, left" visiting order with one stack;
        # reversed, that order is exactly postorder (left, right, root).
        stack: List[TreeNode] = [root]
        order: List[TreeNode] = []
        while stack:
            node = stack.pop()
            order.append(node)
            if node.left is not None:
                stack.append(node.left)
            if node.right is not None:
                stack.append(node.right)

        answer = 0
        value_stack: List[List[int]] = []
        for node in reversed(order):
            has_left = node.left is not None
            has_right = node.right is not None
            if not has_left and not has_right:
                freq = [0] * (distance + 1)
                freq[0] = 1
                value_stack.append(freq)
                continue

            # Postorder guarantees the right child's table (if any) was
            # pushed most recently, then the left child's.
            right_freq = value_stack.pop() if has_right else None
            left_freq = value_stack.pop() if has_left else None

            merged = [0] * (distance + 1)
            if has_left and has_right:
                for d1, c1 in enumerate(left_freq):
                    if c1 == 0:
                        continue
                    budget = distance - d1 - 2
                    if budget < 0:
                        continue
                    for d2 in range(min(budget, distance) + 1):
                        c2 = right_freq[d2]
                        if c2:
                            answer += c1 * c2
                for d in range(distance):
                    merged[d + 1] += left_freq[d] + right_freq[d]
            elif has_left:
                for d in range(distance):
                    merged[d + 1] += left_freq[d]
            else:
                for d in range(distance):
                    merged[d + 1] += right_freq[d]
            value_stack.append(merged)

        return answer
