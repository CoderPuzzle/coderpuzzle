from typing import List, Optional


class Solution:
    def smallestNumber(self, pattern: str) -> str:
        result = []
        stack = []
        n = len(pattern)
        for i in range(n + 1):
            # Push 1, 2, 3, ... while inside a 'D' run; the run's positions
            # get consecutive digits, the smallest possible pool.
            stack.append(str(i + 1))
            # An 'I' (or the end) terminates the current 'D' block; popping
            # emits the block's digits in descending order, satisfying 'D'.
            if i == n or pattern[i] == "I":
                while stack:
                    result.append(stack.pop())
        return "".join(result)
