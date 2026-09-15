from typing import List, Optional


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def hasCycle(self, values: List[int], pos: int) -> bool:
        if not values:
            # Empty input is acyclic by convention.
            return False
        # Materialize the wire form: one node per value, then link in order.
        nodes = [ListNode(value) for value in values]
        for i in range(len(nodes) - 1):
            nodes[i].next = nodes[i + 1]
        # Point the tail back at index pos to close the cycle.
        if pos != -1:
            nodes[-1].next = nodes[pos]
        # Floyd's tortoise and hare: slow advances one node per step, fast two.
        slow = nodes[0]
        fast = nodes[0]
        while fast is not None and fast.next is not None:
            slow = slow.next
            fast = fast.next.next
            # fast gains one node per lap on slow, so inside a cycle it must
            # catch slow within a single lap: meeting proves the cycle.
            if slow is fast:
                return True
        # fast ran past the end of the list: no cycle.
        return False
