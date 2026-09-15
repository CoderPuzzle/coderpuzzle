from collections import deque


class Solution:
    def connect(self, root):
        if root is None:
            return None
        queue = deque([root])
        while queue:
            # Snapshot the width now: children appended below belong to the
            # next level, so draining exactly this many nodes walks one
            # level per round.
            width = len(queue)
            previous = None
            for _ in range(width):
                node = queue.popleft()
                # The node dequeued just before this one is exactly its
                # right-hand neighbor; the level's last node finds no
                # successor and keeps its empty `next`.
                if previous is not None:
                    previous.next = node
                previous = node
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
        return root
