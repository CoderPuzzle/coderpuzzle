from typing import List


class Solution:
    def resultsArray(self, nums: List[int], k: int) -> List[int]:
        # run counts the consecutive +1 steps ending at the current index;
        # a size-k window is powered iff its last k - 1 adjacent pairs all
        # stepped up by one, i.e. run reaches k - 1 at the window's end.
        results = []
        run = 0
        for i, value in enumerate(nums):
            run = run + 1 if i > 0 and value == nums[i - 1] + 1 else 0
            if i >= k - 1:
                results.append(value if run >= k - 1 else -1)
        return results
