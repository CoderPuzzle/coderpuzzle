class Solution:
    def maxIncreasingSubarrays(self, nums: List[int]) -> int:
        # Split nums into maximal strictly increasing runs. Two adjacent
        # k-windows either sit inside one run of length l (then k <= l // 2)
        # or meet exactly at a run boundary, one in each of two consecutive
        # runs (then k <= min of the two lengths). The answer is the largest
        # of those candidates over all boundaries.
        best = 1
        prev = 0
        cur = 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                cur += 1
            else:
                best = max(best, min(prev, cur), cur // 2)
                prev = cur
                cur = 1
        return max(best, min(prev, cur), cur // 2)
