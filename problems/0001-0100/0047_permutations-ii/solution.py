from typing import List


class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        # Fresh sorted list: caller's array is untouched. Sorting makes every
        # position choose among the remaining values in ascending order, so
        # the finished permutations emerge in lexicographic order.
        nums = sorted(nums)
        permutations: List[List[int]] = []
        current: List[int] = []
        # One flag per slot: each element is consumed at most once per
        # permutation, cleared again on the way back up.
        used: List[bool] = [False] * len(nums)

        def backtrack() -> None:
            if len(current) == len(nums):
                # Every position filled: snapshot the finished permutation.
                permutations.append(current[:])
                return
            for i in range(len(nums)):
                if used[i]:
                    continue
                # A value equal to the one just abandoned at this depth would
                # rebuild the same permutation, so skip runs of equal values:
                # a duplicate may only be placed once its left twin is used.
                if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                    continue
                used[i] = True
                current.append(nums[i])
                backtrack()
                current.pop()
                used[i] = False

        backtrack()
        return permutations
