from typing import Optional


class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        # An empty list has nothing to rotate — and no length to mod by.
        if not head:
            return None
        # One walk measures the list and ends on its tail; linking the tail
        # back onto the head closes a ring, so rotation becomes pointer
        # arithmetic rather than node surgery.
        n = 1
        tail = head
        while tail.next:
            tail = tail.next
            n += 1
        tail.next = head
        # Rotate by the remainder only; the new tail stands n - k steps
        # around the ring from the head (k = 0 lands on the old tail, and
        # the cut below simply restores the original list).
        k %= n
        new_tail = head
        for _ in range(n - k - 1):
            new_tail = new_tail.next
        new_head = new_tail.next
        new_tail.next = None
        return new_head
