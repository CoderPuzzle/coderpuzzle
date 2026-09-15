from typing import List, Optional


class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        # Fresh sorted list: caller's array is untouched. Sorting means every
        # emitted quadruplet is already ascending, and scanning i, then j, left
        # to right emits the quadruplets in lexicographic order.
        nums = sorted(nums)
        n = len(nums)
        result = []
        for i in range(n - 3):
            # Reusing the same value for the first slot would re-find the same
            # triples, so skip runs of equal values.
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            for j in range(i + 1, n - 2):
                # Same skip one level down, measured against j's own start.
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                left, right = j + 1, n - 1
                while left < right:
                    total = nums[i] + nums[j] + nums[left] + nums[right]
                    # Below target the sum must grow, so left moves right;
                    # above target, right retreats.
                    if total < target:
                        left += 1
                    elif total > target:
                        right -= 1
                    else:
                        result.append([nums[i], nums[j], nums[left], nums[right]])
                        # Both advance, then run past any runs of equal values,
                        # so the same pair is never emitted twice for one (i, j).
                        left += 1
                        right -= 1
                        while left < right and nums[left] == nums[left - 1]:
                            left += 1
                        while left < right and nums[right] == nums[right + 1]:
                            right -= 1
        return result
