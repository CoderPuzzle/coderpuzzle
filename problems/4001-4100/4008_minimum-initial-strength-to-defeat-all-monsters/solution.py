from typing import List


class Solution:
    def minInitialStrength(self, monsters: List[int], boosts: List[List[int]]) -> int:
        n = len(monsters)
        delta = [0] * (n + 1)
        for left, right, value in boosts:
            delta[left] += value
            delta[right + 1] -= value

        bonus = 0
        prefix = 0
        answer = 0
        for i in range(n):
            bonus += delta[i]
            needed = monsters[i] - bonus
            if needed > 0 and prefix + needed > answer:
                answer = prefix + needed
            prefix += monsters[i]
        return answer
