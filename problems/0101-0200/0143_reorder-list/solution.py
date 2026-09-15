from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def reorderList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Lists of length 0 or 1 are already in the target order.
        if head is None or head.next is None:
            return head
        # Slow steps one node, fast two, so fast falls off the end while
        # slow stands on the last node of the front half.
        slow = fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
        # Unhook the back half and reverse it in place: `prev` ends up as
        # its head, reading the original back half backwards.
        back = slow.next
        slow.next = None
        prev = None
        while back:
            back.next, prev, back = prev, back, back.next
        # Weave: each front node hands its successor to the current back
        # node and takes that node in its place; the back chain, never
        # longer than the front, runs out first.
        front = head
        while prev:
            next_front, next_back = front.next, prev.next
            front.next = prev
            prev.next = next_front
            front, prev = next_front, next_back
        return head
