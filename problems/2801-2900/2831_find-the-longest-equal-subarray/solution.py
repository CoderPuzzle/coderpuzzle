from typing import List


class Solution:
    def longestEqualSubarray(self, nums: List[int], k: int) -> int:
        positions_by_value: dict[int, List[int]] = {}
        for i, value in enumerate(nums):
            positions_by_value.setdefault(value, []).append(i)
        answer = 0
        for positions in positions_by_value.values():
            left = 0
            for right in range(len(positions)):
                # Span length minus kept copies is the deletion cost.
                while (positions[right] - positions[left]) - (right - left) > k:
                    left += 1
                answer = max(answer, right - left + 1)
        return answer
