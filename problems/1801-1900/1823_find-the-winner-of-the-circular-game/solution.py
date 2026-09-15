from typing import List, Optional


class Solution:
    def findTheWinner(self, n: int, k: int) -> int:
        # Surviving friends in circle order; idx marks where the next count starts.
        friends = list(range(1, n + 1))
        idx = 0
        while len(friends) > 1:
            # -1: the starting friend is counted too; % wraps the circle (k may exceed its size).
            idx = (idx + k - 1) % len(friends)
            # The clockwise neighbor shifts into the vacated slot, so idx already
            # points at where the next count must begin — no extra adjustment needed.
            friends.pop(idx)
        return friends[0]
