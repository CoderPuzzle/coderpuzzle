from typing import Optional


class Solution:
    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        # A dummy head stands in front of the real list, so deleting the
        # original head is an ordinary unlink of somebody's successor.
        dummy = ListNode(0)
        dummy.next = head
        current = dummy
        while current.next:
            if current.next.val == val:
                # Skip the matching node. The cursor stays put — the node
                # behind it may match too, and that node is now current.next.
                current.next = current.next.next
            else:
                # A keeper: step onto it and look at what follows.
                current = current.next
        return dummy.next
