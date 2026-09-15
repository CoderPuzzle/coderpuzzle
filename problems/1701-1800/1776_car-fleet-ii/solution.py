from typing import List, Optional


class Solution:
    def getCollisionTimes(self, cars: List[List[int]]) -> List[float]:
        n = len(cars)
        answer = [-1.0] * n
        # Right-to-left scan; the stack holds cars still free-wheeling, the
        # possible first collisions for everything to their left.
        stack = []
        for i in range(n - 1, -1, -1):
            position, speed = cars[i]
            # A car at least as fast ahead can never be caught — pop it.
            while stack and speed <= cars[stack[-1]][1]:
                stack.pop()
            while stack:
                j = stack[-1]
                # When i would reach j, assuming j keeps its speed.
                t = (cars[j][0] - position) / (speed - cars[j][1])
                # If j merges earlier, it has slowed before i arrives: it is
                # no first collision for i (nor for anyone further left), so
                # pop permanently and try the next candidate.
                if answer[j] > 0 and t >= answer[j]:
                    stack.pop()
                else:
                    answer[i] = t
                    break
            stack.append(i)
        return answer
