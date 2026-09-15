from typing import List


class Solution:
    def minCost(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        n = len(nums)
        forward = [0] * max(n - 1, 0)
        backward = [0] * max(n - 1, 0)

        for i in range(n):
            if i == 0:
                closest = 1
            elif i == n - 1:
                closest = n - 2
            else:
                left = nums[i] - nums[i - 1]
                right = nums[i + 1] - nums[i]
                closest = i - 1 if left <= right else i + 1

            if i > 0:
                backward[i - 1] = 1 if closest == i - 1 else nums[i] - nums[i - 1]
            if i < n - 1:
                forward[i] = 1 if closest == i + 1 else nums[i + 1] - nums[i]

        prefix_forward = [0] * n
        prefix_backward = [0] * n
        for i in range(1, n):
            prefix_forward[i] = prefix_forward[i - 1] + forward[i - 1]
            prefix_backward[i] = prefix_backward[i - 1] + backward[i - 1]

        answer = []
        for left, right in queries:
            if left <= right:
                answer.append(prefix_forward[right] - prefix_forward[left])
            else:
                answer.append(prefix_backward[left] - prefix_backward[right])
        return answer
