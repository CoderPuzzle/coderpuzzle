from typing import List


class Solution:
    def permute(self, n: int) -> List[List[int]]:
        results: List[List[int]] = []
        current: List[int] = []
        # One flag per value: each of 1..n is consumed at most once per
        # permutation, cleared again on the way back up.
        used = [False] * (n + 1)

        def walk() -> None:
            # Every position filled: snapshot the finished permutation.
            if len(current) == n:
                # Copy: current is the shared buffer for the next branch.
                results.append(current[:])
                return
            # Ascending candidates make the walk emit lexicographic order
            # directly; the parity test prunes a branch the moment it would
            # place two adjacent elements both odd or both even.
            for value in range(1, n + 1):
                if used[value]:
                    continue
                if current and value % 2 == current[-1] % 2:
                    continue
                used[value] = True
                current.append(value)
                walk()
                current.pop()
                used[value] = False

        walk()
        return results
