from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def findMode(self, root: Optional[TreeNode]) -> List[int]:
        # Counting modes never needed the BST ordering: the modes are a
        # property of the multiset of values, whatever order a walk meets
        # them in. So this version takes the tree as an ordinary container
        # — a stack pops a node, tallies its value into a dict keyed by
        # the value itself, and pushes the children — and the dict, not
        # adjacency, does the bookkeeping. The walk stays iterative: the
        # tree may be a single 10^4-node chain, whose traversal would
        # nest 10000 calls — past CPython's default recursion limit.
        counts = {}
        stack = [root] if root is not None else []
        while stack:
            node = stack.pop()
            counts[node.val] = counts.get(node.val, 0) + 1
            if node.right is not None:
                stack.append(node.right)
            if node.left is not None:
                stack.append(node.left)

        # One pass over the table finds the largest count; a second
        # collects every value that reaches it. A dict iterates in
        # arbitrary order — the ascending order the streak walk gets for
        # free from inorder is absent here — so the survivors are sorted
        # once at the end.
        best = max(counts.values())
        return sorted(value for value, count in counts.items() if count == best)
