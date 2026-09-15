class Solution:
    def sumOfGoodNumbers(self, nums: List[int], k: int) -> int:
        # One sweep: an element is good when it strictly beats the neighbors
        # that exist at distance k; a missing neighbor never blocks it.
        n = len(nums)
        total = 0
        for i in range(n):
            left_ok = i - k < 0 or nums[i] > nums[i - k]
            right_ok = i + k >= n or nums[i] > nums[i + k]
            if left_ok and right_ok:
                total += nums[i]
        return total
