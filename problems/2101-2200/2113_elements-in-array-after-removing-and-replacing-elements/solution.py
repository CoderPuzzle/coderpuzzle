from typing import List


class Solution:
    def elementInNums(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        length = len(nums)
        cycle = 2 * length
        answer = []
        for time, index in queries:
            phase = time % cycle
            if phase < length:
                original_index = phase + index
                answer.append(nums[original_index] if original_index < length else -1)
            else:
                restored = phase - length
                answer.append(nums[index] if index < restored else -1)
        return answer
