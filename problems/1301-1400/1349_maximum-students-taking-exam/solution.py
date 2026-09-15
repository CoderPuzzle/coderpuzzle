from typing import List, Optional


class Solution:
    def maxStudents(self, seats: List[List[str]]) -> int:
        m = len(seats)
        n = len(seats[0])

        row_masks = []
        for row in seats:
            masks = []
            for mask in range(1 << n):
                ok = True
                for c in range(n):
                    if (mask >> c) & 1:
                        if row[c] == "#":
                            ok = False
                            break
                        if c > 0 and (mask >> (c - 1)) & 1:
                            ok = False
                            break
                if ok:
                    masks.append(mask)
            row_masks.append(masks)

        from functools import lru_cache

        @lru_cache(maxsize=None)
        def dfs(i, prev_mask):
            if i == m:
                return 0
            best = 0
            for mask in row_masks[i]:
                conflict = False
                for c in range(n):
                    if (mask >> c) & 1:
                        if c > 0 and (prev_mask >> (c - 1)) & 1:
                            conflict = True
                            break
                        if c < n - 1 and (prev_mask >> (c + 1)) & 1:
                            conflict = True
                            break
                if not conflict:
                    best = max(best, mask.bit_count() + dfs(i + 1, mask))
            return best

        return dfs(0, 0)
