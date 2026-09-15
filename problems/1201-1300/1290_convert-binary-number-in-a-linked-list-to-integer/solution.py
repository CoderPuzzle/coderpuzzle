class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def getDecimalValue(self, head: ListNode | None) -> int:
        # Horner's rule along the list: each new bit shifts everything
        # seen so far left by one and appends itself.
        value = 0
        node = head
        while node is not None:
            value = value << 1 | node.val
            node = node.next
        return value
