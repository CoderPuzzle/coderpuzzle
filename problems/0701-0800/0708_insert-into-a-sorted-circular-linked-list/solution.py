class Solution:
    def insert(self, head, insertVal):
        node = ListNode(insertVal)
        if head is None:
            node.next = node
            return node
        previous, current = head, head.next
        while current != head:
            fits = previous.val <= insertVal <= current.val
            wraps = previous.val > current.val and (insertVal >= previous.val or insertVal <= current.val)
            if fits or wraps:
                break
            previous, current = current, current.next
        previous.next = node
        node.next = current
        return head
