from typing import List


class Solution:
    def minSizeSubarray(self, nums: List[int], target: int) -> int:
        # Split target into k full copies plus a remainder: any n
        # consecutive elements of the infinite array sum to total, so a
        # remainder hit is a window of length < n whose sum equals rem, and
        # one doubled copy contains every such window for every start
        # phase. Prefix sums strictly increase, so the first-occurrence map
        # finds the unique window of sum rem ending at each index.
        total = sum(nums)
        n = len(nums)
        k, rem = divmod(target, total)
        if rem == 0:
            return k * n
        first = {0: -1}
        pre = 0
        best = -1
        for i, value in enumerate(nums + nums):
            pre += value
            j = first.get(pre - rem)
            if j is not None and (best < 0 or i - j < best):
                best = i - j
            if pre not in first:
                first[pre] = i
        return -1 if best < 0 else k * n + best
