from typing import List


class Solution:
    def meetRequirement(self, n: int, lights: List[List[int]], requirement: List[int]) -> int:
        delta = [0] * (n + 1)
        for position, rng in lights:
            delta[max(0, position - rng)] += 1
            delta[min(n, position + rng + 1)] -= 1
        brightness = 0
        count = 0
        for i in range(n):
            brightness += delta[i]
            if brightness >= requirement[i]:
                count += 1
        return count
