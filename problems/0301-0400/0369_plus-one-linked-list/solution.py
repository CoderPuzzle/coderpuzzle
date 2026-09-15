from typing import Optional


class Solution:
    def plusOne(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # A 0 sentinel absorbs the all-9 carry, so the list growing past
        # its head needs no special case.
        sentinel = ListNode(0, head)
        # One walk parks `last` on the final non-9 digit — the only one a
        # +1 carry can ever reach; every 9 behind it rolls over to 0.
        last = sentinel
        current = sentinel.next
        while current:
            if current.val != 9:
                last = current
            current = current.next
        last.val += 1
        current = last.next
        while current:
            current.val = 0
            current = current.next
        # The sentinel still holds 0 unless every digit was a 9.
        return sentinel if sentinel.val else head
