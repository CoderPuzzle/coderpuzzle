class Solution:
    def createTargetArray(self, nums: List[int], index: List[int]) -> List[int]:
        # Direct simulation: each step splices nums[i] into the growing
        # list at position index[i], pushing the tail right. index[i] <= i
        # keeps every insertion inside the array built so far.
        target = []
        for value, position in zip(nums, index):
            target.insert(position, value)
        return target
