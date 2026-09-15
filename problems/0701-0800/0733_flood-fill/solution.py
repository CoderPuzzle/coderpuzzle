from typing import List, Tuple


class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        # Flood exactly the pixels 4-directionally connected to the seed
        # that still carry the seed's ORIGINAL color. Iterating with an
        # explicit queue is the point — a serpentine component at the
        # bound chains thousands of cells deep, far past any call stack a
        # submission is granted.
        original = image[sr][sc]
        if original == color:
            # Recoloring to the color already there changes nothing, and
            # it would erase the distinction the loop below relies on.
            return image
        m, n = len(image), len(image[0])
        image[sr][sc] = color
        queue: List[Tuple[int, int]] = [(sr, sc)]
        head = 0
        # Writing the new color as a pixel enters the queue is both the
        # fill and the seen-mark: once recolored, a pixel no longer
        # matches `original`, so no pixel is ever enqueued twice.
        while head < len(queue):
            r, c = queue[head]
            head += 1
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < m and 0 <= nc < n and image[nr][nc] == original:
                    image[nr][nc] = color
                    queue.append((nr, nc))
        return image
