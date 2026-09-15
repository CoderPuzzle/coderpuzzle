from typing import List, Optional


class Solution:
    def countGood(self, nums: List[int], k: int) -> int:
        count = {}
        pairs = 0
        ans = 0
        left = 0
        n = len(nums)
        for right in range(n):
            x = nums[right]
            # Appending a value already seen c times inside the window forms
            # exactly c new equal pairs; the map plus this running total keep
            # the pair count exact under any window move (hash map because
            # values reach 1e9).
            pairs += count.get(x, 0)
            count[x] = count.get(x, 0) + 1
            # Window [left, right] has >= k pairs, so it and every extension
            # of it to the right are good: exactly n - right subarrays share
            # this right endpoint and start at left or later.
            while pairs >= k:
                ans += n - right
                y = nums[left]
                # The departing value leaves count[y] copies behind, which is
                # exactly how many pairs its removal destroys.
                count[y] -= 1
                pairs -= count[y]
                left += 1
        return ans
