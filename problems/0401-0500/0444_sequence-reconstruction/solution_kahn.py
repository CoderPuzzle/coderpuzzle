from collections import deque
from typing import List


class Solution:
    def sequenceReconstruction(self, nums: List[int], sequences: List[List[int]]) -> bool:
        # Read the sequences as a precedence graph: each consecutive pair pins
        # u before v, and the shortest supersequences are exactly the
        # permutations of [1, n] respecting every pinned pair. Kahn's algorithm
        # peels the graph's sources in order; the order is forced exactly when
        # there is never more than one source to pick from.
        n = len(nums)
        for seq in sequences:
            for x in seq:
                # A value outside [1, n] cannot occur in nums at all, so nums
                # is not even a supersequence.
                if x < 1 or x > n:
                    return False
        successors = [[] for _ in range(n + 1)]
        unpinned = [0] * (n + 1)
        for seq in sequences:
            for j in range(len(seq) - 1):
                u, v = seq[j], seq[j + 1]
                # A repeated pair only pads v's count; every copy is discharged
                # together when u is picked, so multiplicity is harmless. A
                # pair pinned to one value never discharges and reads as a loop.
                successors[u].append(v)
                unpinned[v] += 1
        # The free values are the ones with no unpinned predecessor left: two
        # at once could each come next, none means the pairs loop.
        free = deque(x for x in range(1, n + 1) if unpinned[x] == 0)
        for want in nums:
            if len(free) != 1:
                return False
            u = free.popleft()
            # The forced next value must be nums's own next value.
            if u != want:
                return False
            for v in successors[u]:
                unpinned[v] -= 1
                if unpinned[v] == 0:
                    free.append(v)
        return True
