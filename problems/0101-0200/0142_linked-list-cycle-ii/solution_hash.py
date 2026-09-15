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
        # Walk from the head remembering every node by identity. The first
        # node to come around a second time is the cycle's entry; running
        # off the end instead means no cycle.
        seen = set()
        node = nodes[0]
        while node is not None and node not in seen:
            seen.add(node)
            node = node.next
        if node is None:
            return -1
        # The judge wants an index: count steps from the head to the entry.
        index = 0
        entry = nodes[0]
        while entry is not node:
            entry = entry.next
            index += 1
        return index
