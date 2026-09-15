class Solution:
    def minPairSum(self, nums: List[int]) -> int:
        # Pair sorted extremes: nums[i] with nums[n-1-i]. An exchange
        # argument shows this minimizes the largest pair sum.
        s = sorted(nums)
        return max(s[i] + s[-1 - i] for i in range(len(s) // 2))
