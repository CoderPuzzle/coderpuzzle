from typing import List, Optional


class Solution:
    def maximumSegmentSum(self, nums: List[int], removeQueries: List[int]) -> List[int]:
        n = len(nums)
        parent = list(range(n))
        ssum = [0] * n
        active = [False] * n

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        # Reverse time: removals become activations, so the process only
        # ever merges segments. The leading 0 is the answer after the last
        # removal, where nothing remains; skip removeQueries[0] (all other
        # positions are still active at that point).
        answer = [0]
        best = 0
        for q in reversed(removeQueries[1:]):
            i = q
            active[i] = True
            ssum[i] = nums[i]
            # Merge with any active neighbor; the component total stays at
            # the new root, so ssum[find(i)] is the whole merged block.
            for j in (i - 1, i + 1):
                if 0 <= j < n and active[j]:
                    a, b = find(i), find(j)
                    if a != b:
                        parent[a] = b
                        ssum[b] += ssum[a]
            # Segments only grow along the reversed timeline, so the running
            # max is monotone — one max per step, nothing to evict.
            best = max(best, ssum[find(i)])
            answer.append(best)
        answer.reverse()
        return answer
