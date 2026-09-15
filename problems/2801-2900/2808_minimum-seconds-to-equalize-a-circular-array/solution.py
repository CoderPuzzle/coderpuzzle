from typing import List


class Solution:
    def minimumSeconds(self, nums: List[int]) -> int:
        first_seen: dict[int, int] = {}
        last_seen: dict[int, int] = {}
        max_forward_gap: dict[int, int] = {}
        for i, num in enumerate(nums):
            if num in first_seen:
                max_forward_gap[num] = max(max_forward_gap[num], i - last_seen[num])
            else:
                first_seen[num] = i
                max_forward_gap[num] = 0
            last_seen[num] = i
        n = len(nums)
        answer = n
        for num, start in first_seen.items():
            gap = max(max_forward_gap[num], n - last_seen[num] + start)
            answer = min(answer, gap // 2)
        return answer
