from collections import deque
from typing import List


class Solution:
    def maximumSum(self, nums: List[int], m: int, l: int, r: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, value in enumerate(nums, 1):
            prefix[i] = prefix[i - 1] + value

        impossible = float("-inf")
        previous = [0] * (n + 1)
        answer = impossible

        for _ in range(min(m, n // l)):
            current = [impossible] * (n + 1)
            candidates = deque()
            for end in range(1, n + 1):
                start = end - l
                if start >= 0 and previous[start] != impossible:
                    value = previous[start] - prefix[start]
                    while candidates and candidates[-1][1] <= value:
                        candidates.pop()
                    candidates.append((start, value))

                earliest = end - r
                while candidates and candidates[0][0] < earliest:
                    candidates.popleft()

                current[end] = current[end - 1]
                if candidates:
                    current[end] = max(current[end], prefix[end] + candidates[0][1])

            answer = max(answer, current[n])
            previous = current

        return answer
