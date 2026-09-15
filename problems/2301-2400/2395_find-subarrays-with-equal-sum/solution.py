class Solution:
    def findSubarrays(self, nums: List[int]) -> bool:
        # Sweep the n-1 length-2 window sums into a set; the first
        # repeat answers true.
        seen = set()
        for i in range(len(nums) - 1):
            pair_sum = nums[i] + nums[i + 1]
            if pair_sum in seen:
                return True
            seen.add(pair_sum)
        return False
