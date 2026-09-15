from collections import deque
from typing import List


class Solution:
    def minSplitMerge(self, nums1: List[int], nums2: List[int]) -> int:
        # Every operation costs exactly one layer, so breadth-first search
        # from nums1 reaches nums2 along a shortest operation sequence; the
        # whole state space holds at most n! <= 720 arrays.
        start, goal = tuple(nums1), tuple(nums2)
        if start == goal:
            return 0
        seen = {start}
        queue = deque([start])
        steps = 0
        while queue:
            steps += 1
            for _ in range(len(queue)):
                state = queue.popleft()
                # Cut every subarray [l..r] (single elements included) and
                # paste it at every slot of the remainder.
                n = len(state)
                for l in range(n):
                    for r in range(l, n):
                        rest = state[:l] + state[r + 1 :]
                        piece = state[l : r + 1]
                        for i in range(len(rest) + 1):
                            nxt = rest[:i] + piece + rest[i:]
                            if nxt == goal:
                                return steps
                            if nxt not in seen:
                                seen.add(nxt)
                                queue.append(nxt)
        return -1  # unreachable: nums2 is guaranteed to be a permutation
