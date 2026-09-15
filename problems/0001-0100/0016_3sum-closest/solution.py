from typing import List, Optional


class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        # Sorting is what buys the two-pointer scan: past any index values
        # only grow, so a sum that is too small safely retires its low end
        # and a sum that is too large retires its high end.
        nums = sorted(nums)
        closest = nums[0] + nums[1] + nums[2]
        for i in range(len(nums) - 2):
            lo, hi = i + 1, len(nums) - 1
            while lo < hi:
                total = nums[i] + nums[lo] + nums[hi]
                # Distance zero cannot be beaten, so an exact hit returns
                # on the spot.
                if total == target:
                    return total
                if abs(total - target) < abs(closest - target):
                    closest = total
                # Retire the end that pushed the sum to the wrong side:
                # sorted order makes every partner behind it further away.
                if total < target:
                    lo += 1
                else:
                    hi -= 1
        return closest
