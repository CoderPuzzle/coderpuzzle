from typing import List


class Solution:
    def minimumRounds(self, tasks: List[int]) -> int:
        from collections import Counter

        rounds = 0
        for count in Counter(tasks).values():
            if count == 1:
                return -1
            rounds += (count + 2) // 3
        return rounds
