class Solution:
    def flatten(self, head):
        node = head
        while node is not None:
            if node.child is None:
                node = node.next
                continue
            tail = node.child
            while tail.next is not None:
                tail = tail.next
            tail.next = node.next
            if node.next is not None:
                node.next.prev = tail
            node.next = node.child
            node.child.prev = node
            node.child = None
            node = node.next
        return head
