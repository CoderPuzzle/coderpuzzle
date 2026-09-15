from typing import List


class Solution:
    def numTimesAllBlue(self, flips: List[int]) -> int:
        rightmost = 0
        count = 0
        for i, position in enumerate(flips):
            if position > rightmost:
                rightmost = position
            # Prefix-aligned exactly when positions 1..i+1 are all flipped,
            # which for a permutation holds iff the max flipped equals i+1.
            if rightmost == i + 1:
                count += 1
        return count
