from typing import List, Optional

from collections import defaultdict


class Solution:
    def distance(self, nums: List[int]) -> List[int]:
        # Only equal values interact, so bucket indices by value; each bucket
        # is an independent 1-D problem over its sorted occurrence list.
        pos = defaultdict(list)
        for i, x in enumerate(nums):
            pos[x].append(i)
        arr = [0] * len(nums)
        for idxs in pos.values():
            m = len(idxs)
            # Prefix sums of the occurrence indices turn every distance total
            # into O(1) arithmetic — vital since one value may dominate.
            prefix = [0] * (m + 1)
            for j, i in enumerate(idxs):
                prefix[j + 1] = prefix[j] + i
            for j, i in enumerate(idxs):
                # j earlier occurrences each at distance i - idx:
                left = i * j - prefix[j]
                # m - 1 - j later occurrences each at distance idx - i:
                right = (prefix[m] - prefix[j + 1]) - i * (m - 1 - j)
                arr[i] = left + right
        return arr
