from typing import List, Optional


class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Dummy head anchors the result list so the first node is not a
        # special case; tail always points at the last node built.
        dummy = ListNode(0)
        tail = dummy
        carry = 0
        # One loop condition covers all edge cases at once: lists of unequal
        # length and a leftover final carry (5 + 5 -> [0, 1]).
        while l1 or l2 or carry:
            # A list that has run out simply contributes nothing.
            total = carry
            if l1:
                total += l1.val
                l1 = l1.next
            if l2:
                total += l2.val
                l2 = l2.next
            # Split the column total into the new carry and the digit to append.
            carry, digit = divmod(total, 10)
            tail.next = ListNode(digit)
            tail = tail.next
        # Both inputs are exhausted and the carry is zero: the sum is complete.
        return dummy.next
