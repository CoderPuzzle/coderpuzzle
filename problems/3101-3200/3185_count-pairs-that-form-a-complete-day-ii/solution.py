from typing import List


class Solution:
    def countCompleteDayPairs(self, hours: List[int]) -> int:
        # One left-to-right pass keeps a running count per residue class;
        # before joining its own bucket, each index adds the number of
        # earlier values carrying the complementary residue (24 - r) % 24
        # — exactly the pairs whose residues sum to a multiple of 24.
        # Answers reach C(500000, 2) = 124999750000 at the limits: far past
        # 32 bits (fixed-width languages accumulate in 64-bit) yet well
        # inside Number's exact integer window below 2^53 for JS/TS.
        counts = [0] * 24
        answer = 0
        for value in hours:
            r = value % 24
            answer += counts[(24 - r) % 24]
            counts[r] += 1
        return answer
