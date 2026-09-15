from typing import List


class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        lo, hi = 0, len(nums) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                return True
            if nums[lo] == nums[mid] == nums[hi]:
                # An equal run may straddle the pivot, so neither comparison
                # below can tell which half is sorted. nums[lo] equals
                # nums[mid] and was just shown != target, so dropping index
                # lo keeps the answer while strictly shrinking the window.
                lo += 1
            elif nums[lo] <= nums[mid]:
                # Left half is sorted: a target inside its value range can
                # only lie there.
                if nums[lo] <= target < nums[mid]:
                    hi = mid - 1
                else:
                    lo = mid + 1
            else:
                # Right half is sorted; the mirror argument applies.
                if nums[mid] < target <= nums[hi]:
                    lo = mid + 1
                else:
                    hi = mid - 1
        return False
