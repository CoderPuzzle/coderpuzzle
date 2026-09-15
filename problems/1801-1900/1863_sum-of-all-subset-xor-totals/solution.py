class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        # Every bit set in any element appears in exactly half of the 2^n
        # subsets, so the answer is (OR of all elements) * 2^(n-1).
        or_all = 0
        for v in nums:
            or_all |= v
        return or_all << (len(nums) - 1)
