from typing import List, Optional


class Solution:
    def lenLongestFibSubseq(self, arr: List[int]) -> int:
        # dp[(j, i)] = length of the longest Fibonacci-like subsequence ending
        # with arr[j], arr[i].
        index_of = {value: i for i, value in enumerate(arr)}
        dp = {}
        best = 0
        for i in range(len(arr)):
            for j in range(i):
                need = arr[i] - arr[j]
                if need < arr[j] and need in index_of:
                    k = index_of[need]
                    dp[(j, i)] = dp.get((k, j), 2) + 1
                    best = max(best, dp[(j, i)])
                else:
                    dp[(j, i)] = 2
        return best if best >= 3 else 0
