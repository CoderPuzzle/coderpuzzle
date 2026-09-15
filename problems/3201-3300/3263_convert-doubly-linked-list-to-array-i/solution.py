class Solution:
    def toArray(self, head: Optional[ListNode]) -> Optional[DoublyListNode]:
        # `first` remembers the head to return; `tail` is the node every
        # fresh append points its `prev` back at. The first node is the one
        # append with no predecessor, so its `prev` stays None.
        first = tail = None
        node = head
        while node is not None:
            fresh = DoublyListNode(node.val)
            if tail is not None:
                tail.next = fresh
                fresh.prev = tail
            else:
                first = fresh
            tail = fresh
            node = node.next
        return first
