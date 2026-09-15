from typing import Optional


class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Stacks reverse the reading order without touching the inputs:
        # both least-significant digits end up on top, so the ones
        # columns line up however the lengths differ.
        stack1 = []
        stack2 = []
        while l1:
            stack1.append(l1.val)
            l1 = l1.next
        while l2:
            stack2.append(l2.val)
            l2 = l2.next
        # Column addition from the least-significant end. Digits come out
        # least-significant first, so each new node is linked in front of
        # the previous one — front-insertion restores the required
        # most-significant-first order as the loop runs.
        head = None
        carry = 0
        # One loop condition covers every edge case at once: unequal
        # lengths and a leftover final carry (999 + 1 -> 1000).
        while stack1 or stack2 or carry:
            # An empty stack simply contributes nothing.
            total = carry
            if stack1:
                total += stack1.pop()
            if stack2:
                total += stack2.pop()
            # Split the column total into the new carry and the digit to emit.
            carry, digit = divmod(total, 10)
            head = ListNode(digit, head)
        return head
