class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        # Fresh sorted list: caller's array is untouched. Sorting means every
        # emitted triplet is already ascending, and scanning i left to right
        # emits triplets in lexicographic order.
        nums = sorted(nums)
        n = len(nums)
        result = []
        for i in range(n - 2):
            # Reusing the same value for the fixed element would re-find the
            # same pairs, so skip runs of equal values.
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            # Early exit: the smallest remaining value is already positive,
            # so no triplet from here on can sum to zero.
            if nums[i] * 3 > 0:
                break
            left, right = i + 1, n - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                # Below zero the sum must grow, so left moves right; above
                # zero, right retreats.
                if total < 0:
                    left += 1
                elif total > 0:
                    right -= 1
                else:
                    result.append([nums[i], nums[left], nums[right]])
                    # Both advance, then run past any runs of equal values,
                    # so the same pair is never emitted twice for one i.
                    left += 1
                    right -= 1
                    while left < right and nums[left] == nums[left - 1]:
                        left += 1
                    while left < right and nums[right] == nums[right + 1]:
                        right -= 1
        return result
