from typing import List, Optional


class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        answer = [0] * n
        # Stack of days still waiting for a warmer one; their temperatures
        # are non-increasing bottom to top. Unanswered days keep answer 0.
        stack: List[int] = []
        for day, temp in enumerate(temperatures):
            # Strictly warmer today resolves each waiting day on top; equal
            # temperatures leave them waiting (strict < comparison).
            while stack and temperatures[stack[-1]] < temp:
                previous = stack.pop()
                answer[previous] = day - previous
            stack.append(day)
        return answer
