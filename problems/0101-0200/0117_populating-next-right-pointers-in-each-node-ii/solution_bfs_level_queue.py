from collections import deque


class Solution:
    def connect(self, root):
        if root is None:
            return None
        queue = deque([root])
        while queue:
            # len(queue) is this level's width; children appended inside the
            # loop belong to the next level and never enter this round.
            previous = None
            for _ in range(len(queue)):
                node = queue.popleft()
                # Link to whoever is dequeued next within the same level; the
                # level's last node keeps the empty next it started with.
                if previous is not None:
                    previous.next = node
                previous = node
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
        return root
