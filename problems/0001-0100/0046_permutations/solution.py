from typing import List


class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        # Sorted copy leaves the caller's list untouched; trying candidates in
        # ascending order makes the walk emit lexicographic order directly.
        values = sorted(nums)
        n = len(values)
        permutations: List[List[int]] = []
        current: List[int] = []
        used = [False] * n

        def walk() -> None:
            # A leaf has one chosen element per position: a full permutation.
            if len(current) == n:
                # Copy: current is the shared buffer for the next branch.
                permutations.append(current[:])
                return
            for index in range(n):
                # Marks replace an O(n) membership scan; skip taken elements.
                if used[index]:
                    continue
                used[index] = True
                current.append(values[index])
                walk()
                current.pop()
                used[index] = False

        walk()
        return permutations
