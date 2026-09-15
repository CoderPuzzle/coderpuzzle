from typing import List, Optional


class Solution:
    def canSeePersonsCount(self, heights: List[int]) -> List[int]:
        n = len(heights)
        answer = [0] * n
        # Scan right-to-left; the stack holds exactly the people visible to a
        # shorter person arriving from the left (heights increasing top-down).
        stack = []
        for i in range(n - 1, -1, -1):
            seen = 0
            # Each popped person is shorter and has only shorter people
            # between themselves and i, so i sees them. Strict < suffices
            # because all heights are distinct.
            while stack and stack[-1] < heights[i]:
                stack.pop()
                seen += 1
            # If anything remains, its top is the first person right of i
            # taller than i: visible across the popped people, and it blocks
            # everyone beyond it. Popped entries stay discarded -- i shadows
            # them for anyone further left.
            answer[i] = seen + (1 if stack else 0)
            stack.append(heights[i])
        # Each index is pushed and popped at most once: linear in total.
        return answer
