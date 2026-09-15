from typing import List, Optional


class Solution:
    def splitPainting(self, segments: List[List[int]]) -> List[List[int]]:
        # Difference events per segment: +color at its start, -color at its
        # end. The mixed sum is piecewise constant and can only change at
        # these coordinates.
        diff = {}
        for start, end, color in segments:
            diff[start] = diff.get(start, 0) + color
            diff[end] = diff.get(end, 0) - color
        keys = sorted(diff)
        result = []
        running = 0
        for i in range(len(keys) - 1):
            # Between consecutive event coordinates the active set is fixed,
            # so running is exactly the mixed color on that open interval.
            # Colors are distinct, so each event genuinely changes the sum --
            # emitting at every coordinate is minimal, not merely correct.
            running += diff[keys[i]]
            if running > 0:  # skip unpainted gaps where nothing is active
                result.append([keys[i], keys[i + 1], running])
        return result
