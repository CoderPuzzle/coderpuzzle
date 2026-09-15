from typing import List, Optional


class Solution:
    def firstUniqueFreq(self, nums: List[int]) -> int:
        # freq maps each value to how often it appears; freqCount maps each
        # frequency to how many distinct values share it. A value's frequency
        # is unique exactly when freqCount[freq[x]] == 1.
        freq = {}
        for x in nums:
            freq[x] = freq.get(x, 0) + 1
        freqCount = {}
        for f in freq.values():
            freqCount[f] = freqCount.get(f, 0) + 1
        # Scan in index order: the first element whose value has a unique
        # frequency wins, even if a "smaller" qualifying value appears later.
        for x in nums:
            if freqCount[freq[x]] == 1:
                return x
        return -1
