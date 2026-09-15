from typing import Optional


class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        # Copy the values into an array; the list itself only needs one
        # forward walk.
        values = []
        node = head
        while node:
            values.append(node.val)
            node = node.next
        # Two-ended compare: i walks forward, j backward, and every mirror
        # pair must agree before the indices meet in the middle.
        i = 0
        j = len(values) - 1
        while i < j:
            if values[i] != values[j]:
                return False
            i += 1
            j -= 1
        return True
