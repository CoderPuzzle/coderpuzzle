from typing import List


class Solution:
    def countCompleteDayPairs(self, hours: List[int]) -> int:
        # With n <= 100 there are at most 4950 pairs, so hint 1's straight
        # double scan is exactly right at this scale. Each value already
        # reaches 10^9, so their raw pairwise sum reaches 2 * 10^9 and
        # would overflow a signed 32-bit adder in fixed-width languages;
        # reducing every value to its residue first keeps all arithmetic
        # inside a couple of dozen ticks.
        residues = [value % 24 for value in hours]
        count = 0
        for i in range(len(residues)):
            for j in range(i + 1, len(residues)):
                if (residues[i] + residues[j]) % 24 == 0:
                    count += 1
        return count
