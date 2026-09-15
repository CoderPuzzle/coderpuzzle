from typing import Optional


class Solution:
    def frequenciesOfElements(self, head: Optional[ListNode]) -> Optional[ListNode]:
        counts = {}
        order = []
        node = head
        while node:
            if node.val not in counts:
                counts[node.val] = 0
                order.append(node.val)
            counts[node.val] += 1
            node = node.next
        dummy = ListNode()
        tail = dummy
        for value in order:
            tail.next = ListNode(counts[value])
            tail = tail.next
        return dummy.next
