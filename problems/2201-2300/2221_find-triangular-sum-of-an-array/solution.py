class Solution:
    def triangularSum(self, nums: List[int]) -> int:
        current = nums
        while len(current) > 1:
            current = [(current[i] + current[i + 1]) % 10 for i in range(len(current) - 1)]
        return current[0]
