from typing import List


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def detectCycle(self, values: List[int], pos: int) -> int:
        if not values:
            return -1
        # Materialize the wire form: one node per value, tail back to pos.
        nodes = [ListNode(value) for value in values]
        for i in range(len(nodes) - 1):
            nodes[i].next = nodes[i + 1]
        if pos != -1:
            nodes[-1].next = nodes[pos]
        # Phase 1: tortoise-and-hare scan; fast falling off the end means
        # no cycle.
        slow = nodes[0]
        fast = nodes[0]
        while fast is not None and fast.next is not None:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                # Phase 2: with a = head-to-entry, b = entry-to-meeting and
                # c = the rest of the loop, a + 2b + c = 2(a + b) gives c = a,
                # so a finder restarted at the head and slow continuing from
                # the meeting point converge after exactly a steps — on the
                # entry node.
                finder = nodes[0]
                while finder is not slow:
                    finder = finder.next
                    slow = slow.next
                # The judge wants an index: count steps from head to entry.
                index = 0
                entry = nodes[0]
                while entry is not finder:
                    entry = entry.next
                    index += 1
                return index
        return -1
