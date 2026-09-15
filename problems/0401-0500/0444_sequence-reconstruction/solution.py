from typing import List


class Solution:
    def sequenceReconstruction(self, nums: List[int], sequences: List[List[int]]) -> bool:
        # Consecutive elements of a sequence pin an adjacency: every shortest
        # supersequence is a permutation of [1, n] keeping each such pair in
        # order, so nums is the unique one exactly when the pinned pairs chain
        # all of nums together in nums's own order.
        n = len(nums)
        pos = [0] * (n + 1)
        for i, x in enumerate(nums):
            pos[x] = i
        # covered[i] is set once some sequence places nums[i + 1] directly
        # after nums[i]; with n == 1 there is nothing to pin.
        covered = [False] * (n - 1)
        for seq in sequences:
            for x in seq:
                # A value outside [1, n] cannot occur in nums at all, so nums
                # is not even a supersequence.
                if x < 1 or x > n:
                    return False
            for j in range(len(seq) - 1):
                u, v = pos[seq[j]], pos[seq[j + 1]]
                # A pair running backwards in nums means its sequence never
                # embeds in nums.
                if u >= v:
                    return False
                if v == u + 1:
                    covered[u] = True
        # An unpinned adjacency could be flipped into another permutation of
        # the same length, so uniqueness needs every slot pinned.
        return all(covered)
