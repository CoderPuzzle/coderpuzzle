from collections import deque
from typing import List


class Solution:
    def minStickers(self, stickers: List[str], target: str) -> int:
        # BFS over the bitmask of spelled target positions: bit i is set
        # once position i holds a cut letter. From each state, one copy of
        # a sticker spends its letters on the uncovered positions left to
        # right — covering more positions with the same single copy can
        # never hurt, since equal letters are interchangeable. Layers of
        # the BFS are sticker counts, so the first visit to the full mask
        # is the minimum; a target letter found on no sticker at all makes
        # the task impossible.
        m = len(target)
        full = (1 << m) - 1
        need = [ord(letter) - 97 for letter in target]
        available = [False] * 26
        for word in stickers:
            for letter in word:
                available[ord(letter) - 97] = True
        if any(not available[index] for index in need):
            return -1
        stocks = []
        for word in stickers:
            counts = [0] * 26
            for letter in word:
                counts[ord(letter) - 97] += 1
            stocks.append(counts)
        distance = [-1] * (full + 1)
        distance[0] = 0
        queue = deque([0])
        while queue:
            mask = queue.popleft()
            if mask == full:
                return distance[mask]
            steps = distance[mask] + 1
            for counts in stocks:
                remaining = counts.copy()
                nxt = mask
                for i, index in enumerate(need):
                    bit = 1 << i
                    if not mask & bit and remaining[index] > 0:
                        remaining[index] -= 1
                        nxt |= bit
                if nxt != mask and distance[nxt] < 0:
                    distance[nxt] = steps
                    queue.append(nxt)
        return -1
