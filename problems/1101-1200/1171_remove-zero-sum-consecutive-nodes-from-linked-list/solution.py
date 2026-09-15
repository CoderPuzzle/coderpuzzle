from typing import List, Optional


class Solution:
    def removeZeroSumSublists(self, head: Optional[ListNode]) -> Optional[ListNode]:
        values = []
        node = head
        while node is not None:
            values.append(node.val)
            node = node.next

        # Prefix-sum scan: when a prefix repeats, drop every node between the
        # earlier occurrence and the current node (inclusive), then restart.
        restart = True
        while restart:
            restart = False
            prefix_to_index = {0: -1}
            prefix = 0
            i = 0
            while i < len(values):
                prefix += values[i]
                if prefix in prefix_to_index:
                    j = prefix_to_index[prefix]
                    values = values[: j + 1] + values[i + 1 :]
                    restart = True
                    break
                prefix_to_index[prefix] = i
                i += 1

        dummy = ListNode(0)
        current = dummy
        for value in values:
            current.next = ListNode(value)
            current = current.next
        return dummy.next
