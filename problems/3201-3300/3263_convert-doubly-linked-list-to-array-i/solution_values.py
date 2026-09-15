class Solution:
    def toArray(self, head: Optional[ListNode]) -> Optional[DoublyListNode]:
        # Sweep one reads: the values ride out the walk in a buffer.
        values = []
        node = head
        while node is not None:
            values.append(node.val)
            node = node.next
        # Sweep two chains: every buffered value becomes a node appended to
        # the growing tail, pointing back at the node before it.
        first = tail = None
        for value in values:
            fresh = DoublyListNode(value)
            if tail is not None:
                tail.next = fresh
                fresh.prev = tail
            else:
                first = fresh
            tail = fresh
        return first
