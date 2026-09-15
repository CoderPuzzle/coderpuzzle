from typing import List


class Solution:
    def maximumWhiteTiles(self, tiles: List[List[int]], carpetLen: int) -> int:
        # Sort by start, then slide a window of intervals whose left ends fall
        # inside the carpet. Aligning the carpet's left edge with a tile start
        # is always optimal, so trying every tile as the first covered one is
        # enough. Non-overlapping tiles in [1, 10^9] keep every sum within i32,
        # but the reach l + carpetLen - 1 can approach 2 * 10^9.
        tiles.sort()
        n = len(tiles)
        prefix = [0] * (n + 1)
        for i, (l, r) in enumerate(tiles):
            prefix[i + 1] = prefix[i] + (r - l + 1)
        ans = 0
        j = 0
        for i, (l, _) in enumerate(tiles):
            end = l + carpetLen - 1
            while j < n and tiles[j][0] <= end:
                j += 1
            covered = prefix[j] - prefix[i]
            if tiles[j - 1][1] > end:
                covered -= tiles[j - 1][1] - end
            ans = max(ans, covered)
        return ans
