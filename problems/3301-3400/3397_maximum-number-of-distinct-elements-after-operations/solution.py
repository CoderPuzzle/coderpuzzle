from typing import List


class Solution:
    def maxDistinctElements(self, nums: List[int], k: int) -> int:
        # Each element may land anywhere in [v-k, v+k]; assigning the values
        # in sorted order leaves every element the smallest value that is
        # still free and inside its window, which never hurts later ones.
        a = sorted(nums)
        last = a[0] - k - 1
        count = 0
        for v in a:
            target = v - k
            if target <= last:
                target = last + 1
            if target <= v + k:
                last = target
                count += 1
        return count
