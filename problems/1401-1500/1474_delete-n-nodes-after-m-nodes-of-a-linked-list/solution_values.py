class Solution:
    def deleteNodes(self, head: Optional[ListNode], m: int, n: int) -> Optional[ListNode]:
        # Sweep 1: record the values that survive each keep-m, drop-n cycle.
        # A keep run cut short by the tail simply ends the walk; a drop run
        # steps past the nodes it loses.
        kept = []
        node = head
        while node is not None:
            for _ in range(m):
                kept.append(node.val)
                node = node.next
                if node is None:
                    break
            for _ in range(n):
                if node is None:
                    break
                node = node.next
        # Sweep 2: rebuild a fresh list threaded from the surviving values.
        dummy = ListNode(0)
        tail = dummy
        for value in kept:
            tail.next = ListNode(value)
            tail = tail.next
        return dummy.next
