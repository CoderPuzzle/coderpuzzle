from typing import List, Optional


class Solution:
    def canCross(self, stones: List[int]) -> bool:
        n = len(stones)
        index = {position: i for i, position in enumerate(stones)}
        # jumps[i] = set of last-jump sizes that can land on stone i
        jumps = [set() for _ in range(n)]
        jumps[0].add(0)
        for i in range(n):
            for last in jumps[i]:
                for step in (last - 1, last, last + 1):
                    if step <= 0:
                        continue
                    target = stones[i] + step
                    if target in index and index[target] > i:
                        jumps[index[target]].add(step)
        return bool(jumps[n - 1])
