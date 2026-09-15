from typing import List


class Solution:
    def maxDepthAfterSplit(self, seq: str) -> List[int]:
        answer = []
        stack = []  # group id of each still-open parenthesis
        depth = [0, 0]
        last = 0
        for char in seq:
            if char == "(":
                # Open in the shallower group; on a tie reuse the group the
                # previous '(' joined, so the depth gap never exceeds one.
                if depth[0] < depth[1]:
                    group = 0
                elif depth[1] < depth[0]:
                    group = 1
                else:
                    group = last
                answer.append(group)
                stack.append(group)
                depth[group] += 1
                last = group
            else:
                # A ')' must close the matching '(' in the same group.
                group = stack.pop()
                depth[group] -= 1
                answer.append(group)
        return answer
