class Solution:
    def maxSum(self, nums: list[int], k: int, mul: int) -> int:
        nums.sort(reverse=True)
        answer = 0
        multiplied = min(k, max(0, mul - 1))
        for i in range(k):
            answer += nums[i] * (mul - i) if i < multiplied else nums[i]
        return answer
