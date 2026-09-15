from typing import List


class Solution:
    def maxSubarrayLength(self, nums: List[int]) -> int:
        ordered = sorted(((value, index) for index, value in enumerate(nums)), reverse=True)
        n = len(ordered)
        best = 0
        # Sentinel n can never beat any real position x <= n - 1.
        min_index = n
        g = 0
        while g < n:
            value = ordered[g][0]
            h = g
            while h < n and ordered[h][0] == value:
                h += 1
            # Query first: positions of strictly larger values only, so
            # equal-valued endpoints can never pair with each other.
            for _, x in ordered[g:h]:
                if min_index < x and x - min_index + 1 > best:
                    best = x - min_index + 1
            # Then merge this equal-value group into the running minimum.
            for _, x in ordered[g:h]:
                if x < min_index:
                    min_index = x
            g = h
        return best
