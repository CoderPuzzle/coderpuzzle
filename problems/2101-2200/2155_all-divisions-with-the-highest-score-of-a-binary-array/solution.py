from typing import List


class Solution:
    def maxScoreIndices(self, nums: List[int]) -> List[int]:
        # score(i) = zeros in nums[:i] + ones in nums[i:]. Both addends stay
        # as running counters — ones on the right is total_ones minus the
        # ones already passed — so each of the n + 1 division points costs
        # O(1). Ties extend the answer, and the sweep emits indices ascending.
        total_ones = sum(nums)
        ones_left = 0
        zeros_left = 0
        best = -1
        answer = []
        for i in range(len(nums) + 1):
            score = zeros_left + total_ones - ones_left
            if score > best:
                best = score
                answer = [i]
            elif score == best:
                answer.append(i)
            if i < len(nums):
                if nums[i]:
                    ones_left += 1
                else:
                    zeros_left += 1
        return answer
