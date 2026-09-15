from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        # The dummy head anchors the node just before the segment, so a
        # segment that starts at the head is no special case.
        dummy = ListNode(0)
        dummy.next = head
        before = dummy
        for _ in range(left - 1):
            before = before.next
        # Flip exactly right - left + 1 links; `prev` climbs onto each new
        # segment head while `curr` keeps the unconsumed remainder.
        prev, curr = before, before.next
        for _ in range(right - left + 1):
            curr.next, prev, curr = prev, curr, curr.next
        # `before.next` is still the segment's old first node, now its last:
        # it takes over the remainder, and the new head takes its place.
        before.next.next = curr
        before.next = prev
        return dummy.next
