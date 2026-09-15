from typing import List, Optional


class Solution:
    def minSwaps(self, data: List[int]) -> int:
        # the grouped block must hold every 1, so its length is fixed at ones
        ones = sum(data)
        if ones <= 1:
            # zero or a single 1 (or all zeros) is trivially grouped
            return 0
        # zeros in the first window: each zero inside costs exactly one swap
        zeros = data[:ones].count(0)
        best = zeros
        for i in range(ones, len(data)):
            # slide by one: entering element adds its zero-ness, leaving
            # element drops its, so the tally stays exact without rescanning
            zeros += (1 - data[i]) - (1 - data[i - ones])
            if zeros < best:
                best = zeros
        return best
