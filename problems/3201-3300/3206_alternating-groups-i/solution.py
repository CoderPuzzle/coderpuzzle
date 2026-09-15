from typing import List


class Solution:
    def numberOfAlternatingGroups(self, colors: List[int]) -> int:
        # A 3-tile window centered on tile i alternates exactly when both of
        # i's circular neighbors differ from it, so count the tiles whose
        # previous and next tiles (wrapping around) hold the opposite color.
        n = len(colors)
        count = 0
        for i in range(n):
            if colors[i - 1] != colors[i] and colors[i] != colors[(i + 1) % n]:
                count += 1
        return count
