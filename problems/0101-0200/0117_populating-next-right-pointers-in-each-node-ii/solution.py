class Solution:
    def connect(self, root):
        level = root
        while level is not None:
            head = None
            tail = None
            node = level
            while node is not None:
                for child in (node.left, node.right):
                    if child is not None:
                        if head is None:
                            head = child
                        else:
                            tail.next = child
                        tail = child
                node = node.next
            level = head
        return root
