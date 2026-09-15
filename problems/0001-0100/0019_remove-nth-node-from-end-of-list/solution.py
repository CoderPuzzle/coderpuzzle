from typing import Optional


class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        # A dummy node in front of the head makes removing the true head the
        # same unlink as any other node.
        dummy = ListNode(0, head)
        # fast runs n nodes ahead of slow; when fast falls off the end, slow
        # stands on the predecessor of the node being removed.
        fast = slow = dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next
