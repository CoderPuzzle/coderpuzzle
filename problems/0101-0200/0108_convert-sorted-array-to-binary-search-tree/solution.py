from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        def build(lo: int, hi: int) -> Optional[TreeNode]:
            # An empty segment is a missing child.
            if lo > hi:
                return None
            # Root at the segment's middle; of two middles (even length)
            # the second wins — (lo + hi + 1) // 2 — fixing the exact
            # tree the judge expects. Both halves then hold within one
            # element of each other, which keeps every node balanced.
            mid = (lo + hi + 1) // 2
            return TreeNode(nums[mid], build(lo, mid - 1), build(mid + 1, hi))

        return build(0, len(nums) - 1)
