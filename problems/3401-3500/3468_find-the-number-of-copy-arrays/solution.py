from typing import List, Optional


class Solution:
    def countArrays(self, original: List[int], bounds: List[List[int]]) -> int:
        # copy[0] fixes every later entry: copy[i] = copy[0] + original[i] - original[0].
        # Keep the window of admissible copy[0] values by folding each bound in.
        lo, hi = bounds[0]
        for i in range(1, len(original)):
            shift = original[i] - original[0]
            lo = max(lo, bounds[i][0] - shift)
            hi = min(hi, bounds[i][1] - shift)
            if lo > hi:
                return 0
        return hi - lo + 1
