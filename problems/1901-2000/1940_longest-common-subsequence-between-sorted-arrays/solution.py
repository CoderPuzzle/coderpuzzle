from typing import List


class Solution:
    def longestCommonSubsequence(self, arrays: List[List[int]]) -> List[int]:
        # Each array is strictly increasing, so a value appears at most once
        # per array; it is common to all arrays exactly when it is counted
        # len(arrays) times. Values are bounded by 1..100, so a fixed-size
        # count array replaces the map and yields ascending order for free.
        counts = [0] * 101
        for arr in arrays:
            for value in arr:
                counts[value] += 1
        return [v for v in range(1, 101) if counts[v] == len(arrays)]
