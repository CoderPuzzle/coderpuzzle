from typing import List, Optional
from bisect import bisect_left


class Solution:
    def minOperations(self, target: List[int], arr: List[int]) -> int:
        # Answer = len(target) - LCS: each target element not kept costs one
        # insertion. target has distinct values, so rewriting arr as target
        # indices turns the LCS into a longest strictly increasing run.
        index = {value: i for i, value in enumerate(target)}
        # Patience sorting: tails[k] = smallest tail of an increasing
        # subsequence of length k+1; bisect_left keeps it strictly increasing
        # (duplicate arr values map to one index and replace in place).
        tails = []
        for value in arr:
            # Absent values never join a common subsequence and may stay.
            if value not in index:
                continue
            pos = bisect_left(tails, index[value])
            if pos == len(tails):
                tails.append(index[value])
            else:
                tails[pos] = index[value]
        return len(target) - len(tails)
