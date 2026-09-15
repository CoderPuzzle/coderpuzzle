"""Problem-provided doubly linked node (LC 3294 contract)."""


class DoublyListNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next
