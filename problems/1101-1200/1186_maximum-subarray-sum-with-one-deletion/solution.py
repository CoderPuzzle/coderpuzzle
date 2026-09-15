from typing import List, Optional


class Solution:
    def maximumSum(self, arr: List[int]) -> int:
        n = len(arr)
        if n == 1:
            return arr[0]
        # no_del: max subarray sum ending at i with no deletion
        # one_del: max subarray sum ending at i with exactly one deletion
        no_del = arr[0]
        one_del = float("-inf")
        best = arr[0]
        for i in range(1, n):
            # two origins: deletion already used earlier and the subarray
            # extends through arr[i], or the deletion happens exactly now
            # (drop arr[i] from the previous no_del) — one_del must be
            # computed first so it reads the pre-update no_del
            one_del = max(one_del + arr[i], no_del)
            no_del = max(no_del + arr[i], arr[i])
            best = max(best, no_del, one_del)
        return best
