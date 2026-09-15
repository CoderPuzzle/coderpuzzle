from typing import List


class Solution:
    def buildWall(self, height: int, width: int, bricks: List[int]) -> int:
        # A row is fully described by the set of internal joints (bit i =
        # joint between column i and i+1). Two rows are compatible iff
        # their joint masks share no bit. Enumerate every row mask, then
        # count mask sequences of length `height` with adjacent masks
        # disjoint, via DP per row.
        MOD = 10**9 + 7

        masks = []

        def build(position: int, mask: int):
            if position == width:
                masks.append(mask)
                return
            for brick in bricks:
                if position + brick > width:
                    continue
                nxt = position + brick
                extra = (1 << (nxt - 1)) if nxt < width else 0
                build(nxt, mask | extra)

        build(0, 0)
        if not masks:
            return 0

        counts = {mask: 1 for mask in masks}
        for _ in range(height - 1):
            nxt_counts = {}
            for below in masks:
                total = 0
                for above in masks:
                    if above & below == 0:
                        total += counts[above]
                nxt_counts[below] = total % MOD
            counts = nxt_counts
        return sum(counts.values()) % MOD
