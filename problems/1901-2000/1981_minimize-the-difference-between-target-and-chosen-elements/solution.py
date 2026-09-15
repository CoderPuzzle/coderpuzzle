from typing import List


class Solution:
    def minimizeTheDifference(self, mat: List[List[int]], target: int) -> int:
        # Reachable sums as a bitset: bit s is set iff sum s can be formed
        # after the rows processed so far. Each row folds in by shifting.
        bits = 1
        for row in mat:
            folded = 0
            for value in row:
                folded |= bits << value
            bits = folded
        # Closest set bit below target, then the smallest one above it.
        below = bits & ((1 << (target + 1)) - 1)
        best = target - (below.bit_length() - 1) if below else None
        above = bits >> (target + 1)
        if above:
            # above & -above isolates the lowest set bit; its bit_length
            # is one more than that bit's index, i.e. the gap to target.
            cand = (above & -above).bit_length()
            if best is None or cand < best:
                best = cand
        return best
