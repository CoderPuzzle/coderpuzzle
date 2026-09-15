class Solution:
    def connect(self, root):
        if root is None:
            return None
        level = root
        while level.left is not None:
            head = level
            while head is not None:
                head.left.next = head.right
                if head.next is not None:
                    head.right.next = head.next.left
                head = head.next
            level = level.left
        return root
