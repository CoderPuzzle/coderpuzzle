from typing import List


class Solution:
    def maxPointsInsideSquare(self, points: List[List[int]], s: str) -> int:
        # A square centred at the origin takes exactly the points whose
        # Chebyshev radius max(|x|, |y|) is within its half side, so valid
        # squares correspond to prefixes of the order sorted by radius --
        # an entire equal-radius block sits inside or out as one. Sweep
        # blocks outward holding a global seen-tag table; a block that
        # repeats a tag inside itself or against earlier blocks is where
        # every larger square breaks, so the count gathered before it is
        # optimal.
        def radius(i):
            x = abs(points[i][0])
            y = abs(points[i][1])
            return x if x > y else y

        order = sorted(range(len(points)), key=radius)
        seen = [False] * 26
        run = 0
        i = 0
        total = len(points)
        while i < total:
            j = i
            while j < total and radius(order[j]) == radius(order[i]):
                j += 1
            block = []
            ok = True
            for k in range(i, j):
                bit = ord(s[order[k]]) - 97
                if seen[bit] or bit in block:
                    ok = False
                    break
                block.append(bit)
            if not ok:
                return run
            for bit in block:
                seen[bit] = True
            run += j - i
            i = j
        return run
