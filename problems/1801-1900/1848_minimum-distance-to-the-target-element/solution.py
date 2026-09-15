class Solution:
    def getMinDistance(self, nums: List[int], target: int, start: int) -> int:
        # One scan: the closest occurrence of target is whichever index
        # minimizes abs(i - start).
        return min(abs(i - start) for i, v in enumerate(nums) if v == target)
