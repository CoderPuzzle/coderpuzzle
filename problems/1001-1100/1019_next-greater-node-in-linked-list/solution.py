from typing import List, Optional


class Solution:
    def nextLargerNodes(self, head: Optional[ListNode]) -> List[int]:
        values = []
        node = head
        while node is not None:
            values.append(node.val)
            node = node.next
        answer = [0] * len(values)
        stack = []  # indices with values in decreasing order
        for i, value in enumerate(values):
            while stack and values[stack[-1]] < value:
                answer[stack.pop()] = value
            stack.append(i)
        return answer
