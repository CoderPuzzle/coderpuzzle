class Solution:
    def toArray(self, node: Optional[DoublyListNode]) -> List[int]:
        # Walk `next` to the tail without collecting anything; the backward
        # sweep over `prev` then gathers the whole list, tail first. One
        # in-place reverse turns that tail-to-head buffer into the answer.
        while node.next is not None:
            node = node.next
        values = []
        while node is not None:
            values.append(node.val)
            node = node.prev
        values.reverse()
        return values
