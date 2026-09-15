from typing import Optional


class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        # Slow steps one node, fast two, so when fast runs off the end
        # slow stands at the front of the back half.
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        # Reverse the back half in place: unlink each node and prepend it,
        # so the back half reads backward from `second`.
        second = None
        while slow:
            follow = slow.next
            slow.next = second
            second = slow
            slow = follow
        # Compare the halves in lockstep; an odd length parks the middle
        # node at the tail of `second`, where it faces itself.
        left = head
        while second:
            if left.val != second.val:
                return False
            left = left.next
            second = second.next
        return True
