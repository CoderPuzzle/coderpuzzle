class MultiListNode:
    """Doubly linked list node whose nodes may carry a child list."""

    def __init__(self, val=0, prev=None, next=None, child=None):
        self.val = val
        self.prev = prev
        self.next = next
        self.child = child
