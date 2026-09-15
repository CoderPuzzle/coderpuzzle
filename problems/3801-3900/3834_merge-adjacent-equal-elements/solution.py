from typing import List


class Solution:
    def mergeAdjacent(self, nums: List[int]) -> List[int]:
        # Scan left to right keeping a stack of settled elements; when the incoming
        # value equals the top, merge them into their sum and keep cascading left
        # while the new sum equals the new top — the final stack is the answer.
        stack: List[int] = []
        for value in nums:
            if stack and stack[-1] == value:
                merged = stack.pop() + value
                while stack and stack[-1] == merged:
                    merged += stack.pop()
                stack.append(merged)
            else:
                stack.append(value)
        return stack
