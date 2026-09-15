from typing import List


class Solution:
    def absDifference(self, nums: List[int], k: int) -> int:
        # Sorted ascending, the k smallest elements occupy the first k
        # slots and the k largest the last k; all values are positive, so
        # the larger sum always comes from the top end and the absolute
        # difference is just last k minus first k.
        nums.sort()
        return sum(nums[len(nums) - k :]) - sum(nums[:k])
