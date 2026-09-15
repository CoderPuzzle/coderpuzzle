from typing import List


class Solution:
    def numberOfAlternatingGroups(self, colors: List[int], k: int) -> int:
        # A size-k group anchored at start s spans the circle's tiles
        # s .. s + k - 1 and alternates exactly when its k - 1 neighbor
        # pairs all differ. Sweep virtual positions 0 .. n + k - 2 (virtual
        # index p reads tile p % n, so pairs continue seamlessly across the
        # seam), tracking the length of the alternating run ending there;
        # each position credits anchor p - (k - 1) when that anchor is a
        # real start (0..n-1) and the run has reached k. Anchors are bounded
        # to one lap, so no start is ever counted twice.
        n = len(colors)
        count = 0
        run = 0
        for p in range(n + k - 1):
            if p > 0 and colors[p % n] != colors[(p - 1) % n]:
                run += 1
            else:
                run = 1
            anchor = p - (k - 1)
            if 0 <= anchor < n and run >= k:
                count += 1
        return count
