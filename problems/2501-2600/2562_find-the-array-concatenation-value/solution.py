from typing import List


class Solution:
    def findTheArrayConcVal(self, nums: List[int]) -> int:
        # Two pointers eat the array from both ends; every round folds
        # first * 10^digits(last) + last into the running value. This is
        # exactly concat(first, last) without any string round-trip.
        answer = 0
        left, right = 0, len(nums) - 1
        while left < right:
            # Peel decimal digits off the last element to build the shift
            # factor the concatenation needs.
            scale = 10
            tail = nums[right]
            while tail >= 10:
                tail //= 10
                scale *= 10
            answer += nums[left] * scale + nums[right]
            left += 1
            right -= 1
        # Odd length: the surviving middle element joins the total alone.
        if left == right:
            answer += nums[left]
        return answer
