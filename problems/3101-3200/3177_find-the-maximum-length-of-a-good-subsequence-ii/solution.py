from typing import List, Optional


class Solution:
    def maximumLength(self, nums: List[int], k: int) -> int:
        # remap values to compact ids
        mapping = {}
        remapped = []
        for x in nums:
            if x not in mapping:
                mapping[x] = len(mapping)
            remapped.append(mapping[x])
        V = len(mapping)

        # dp[j][v] = max length of a good subsequence ending with value v
        # having exactly j transitions
        dp = [[0] * V for _ in range(k + 1)]
        best1 = [0] * (k + 1)  # max over v of dp[j][v]
        val1 = [-1] * (k + 1)  # argmax
        best2 = [0] * (k + 1)  # second max over v != val1

        for x in remapped:
            cand = [0] * (k + 1)
            for j in range(k + 1):
                c = dp[j][x] + 1  # extend a same-value subsequence
                if j > 0:
                    top = best1[j - 1] if val1[j - 1] != x else best2[j - 1]
                    diff = top + 1  # append after a different value
                    if diff > c:
                        c = diff
                if j == 0:
                    if 1 > c:
                        c = 1
                cand[j] = c
            for j in range(k + 1):
                nv = cand[j]
                if nv <= dp[j][x]:
                    continue
                dp[j][x] = nv
                if val1[j] == x:
                    best1[j] = nv
                else:
                    if nv > best1[j]:
                        best2[j] = best1[j]
                        best1[j] = nv
                        val1[j] = x
                    elif nv > best2[j]:
                        best2[j] = nv

        return max(best1)
