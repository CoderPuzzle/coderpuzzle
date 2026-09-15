from typing import List


class Solution:
    def minLights(self, lights: List[int]) -> int:
        n = len(lights)
        diff = [0] * (n + 1)
        for i, radius in enumerate(lights):
            if radius == 0:
                continue
            left = max(0, i - radius)
            right = min(n - 1, i + radius)
            diff[left] += 1
            diff[right + 1] -= 1

        covered = [0] * n
        current = 0
        for i in range(n):
            current += diff[i]
            covered[i] = current > 0

        answer = 0
        i = 0
        while i < n:
            if not covered[i]:
                answer += 1
                end = min(n - 1, i + 2)
                for j in range(i, end + 1):
                    covered[j] = True
                i = end + 1
            else:
                i += 1
        return answer
