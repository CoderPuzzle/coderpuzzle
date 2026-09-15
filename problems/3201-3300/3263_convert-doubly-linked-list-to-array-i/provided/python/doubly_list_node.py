"""Problem-provided doubly linked node (LC 3263 contract)."""


class DoublyListNode:
    def __init__(self, val=0, next=None, prev=None):
        self.val = val
        self.next = next
        self.prev = prev
