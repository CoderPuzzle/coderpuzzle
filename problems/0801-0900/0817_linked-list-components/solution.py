from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def numComponents(self, head: Optional[ListNode], nums: List[int]) -> int:
        # O(1) membership tests: the set holds every value of nums once.
        wanted = set(nums)
        components = 0
        previous_in = False
        node = head
        while node is not None:
            current_in = node.val in wanted
            # A component starts exactly where membership turns on: this
            # node is in nums and its predecessor was not. The initial
            # false flag folds the head into the same rule — no predecessor.
            if current_in and not previous_in:
                components += 1
            previous_in = current_in
            node = node.next
        return components
