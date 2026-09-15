class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        results = []

        def backtrack(start: int, remaining: int, path: list[int]) -> None:
            # remaining = target minus the sum of the path so far; when it hits 0
            # the path is a valid combination, so record a copy before it mutates.
            if remaining == 0:
                results.append(path[:])
                return
            # Loop from start onward: everything before start stays forbidden.
            for i in range(start, len(candidates)):
                value = candidates[i]
                # Oversized candidate: let the branch die now rather than one
                # layer deeper. A skip, not a break, since input is unsorted.
                if value > remaining:
                    continue
                path.append(value)
                # Recurse with i, not i + 1: a candidate may be reused without
                # limit. This pins every combination to nondecreasing candidate
                # order, so (2, 3, 2) can never form while (2, 2, 3) is found once.
                backtrack(i, remaining - value, path)
                path.pop()

        backtrack(0, target, [])
        return results
