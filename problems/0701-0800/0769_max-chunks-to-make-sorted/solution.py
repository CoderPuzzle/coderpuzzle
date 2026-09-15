from typing import List


class Solution:
    def maxChunksToSorted(self, arr: List[int]) -> int:
        # Prefix maximum sweep: the first i + 1 elements are exactly the
        # set {0..i} iff their maximum is i, so each such index is a cut.
        chunks = 0
        run_max = -1
        for i, v in enumerate(arr):
            if v > run_max:
                run_max = v
            # A boundary lands wherever the running max equals the index:
            # every legal cut is counted, and taking all of them is optimal.
            if run_max == i:
                chunks += 1
        return chunks
