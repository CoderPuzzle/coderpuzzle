from typing import List, Optional


class Solution:
    def sortArray(self, nums: List[int]) -> int:
        def ops_for(target):
            n = len(nums)
            # sigma[i] = destination slot of the item currently at slot i.
            sigma = [target[v] for v in nums]
            blank = nums.index(0)
            visited = [False] * n
            total = 0
            for i in range(n):
                if visited[i]:
                    continue
                # Walk one cycle of the permutation i -> sigma[i].
                length = 0
                has_blank = False
                j = i
                while not visited[j]:
                    visited[j] = True
                    if j == blank:
                        has_blank = True
                    length += 1
                    j = sigma[j]
                if has_blank:
                    # Each move drops one item into the hole the blank
                    # occupies, walking the blank home: length - 1 moves.
                    total += length - 1
                elif length >= 2:
                    # One extra move pulls the blank into this cycle (an
                    # item gets displaced to the blank's own goal), then L
                    # in-cycle placements return it: L + 1 moves.
                    total += length + 1
                # Length-1 cycles are already home and cost nothing.
            return total

        n = len(nums)
        # Two sorted layouts exist — blank last or blank first; compare both
        # (an array cheap for one goal can be dear for the other).
        target_a = [n - 1] + list(range(n - 1))
        target_b = list(range(n))
        return min(ops_for(target_a), ops_for(target_b))
