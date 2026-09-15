from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def kthLargestLevelSum(self, root: Optional[TreeNode], k: int) -> int:
        # One breadth-first sweep, swapping a fresh list in per level and
        # never recursing: a degenerate tree runs 10^5 nodes deep, past
        # any recursion budget. A single level holds at most n <= 10^5
        # nodes worth up to 10^6 each, so its sum stays <= 10^11 and
        # Python integers carry it exactly.
        sums: List[int] = []
        level: List[TreeNode] = [root]
        while level:
            total = 0
            nxt: List[TreeNode] = []
            for node in level:
                total += node.val
                if node.left is not None:
                    nxt.append(node.left)
                if node.right is not None:
                    nxt.append(node.right)
            sums.append(total)
            level = nxt
        if len(sums) < k:
            return -1
        sums.sort(reverse=True)
        return sums[k - 1]
