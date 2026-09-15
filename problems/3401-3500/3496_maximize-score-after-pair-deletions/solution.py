class Solution:
    def maxScore(self, nums: List[int]) -> int:
        # Operations only peel elements off the ends, so what remains is a
        # contiguous block: 1 element when n is odd, 2 adjacent when n is
        # even. Every removed element scores exactly once, so maximize the
        # score by leaving the cheapest possible block behind.
        total = sum(nums)
        if len(nums) % 2:
            return total - min(nums)
        return total - min(nums[i] + nums[i + 1] for i in range(len(nums) - 1))
