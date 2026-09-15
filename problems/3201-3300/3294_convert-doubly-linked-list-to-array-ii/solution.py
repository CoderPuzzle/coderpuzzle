class Solution:
    def toArray(self, node: Optional[DoublyListNode]) -> List[int]:
        # The `prev` chain walks back to the head; the loop exits standing
        # on it, however deep in the list the handed node was. One forward
        # sweep then reads the values out already in order.
        while node.prev is not None:
            node = node.prev
        values = []
        while node is not None:
            values.append(node.val)
            node = node.next
        return values
