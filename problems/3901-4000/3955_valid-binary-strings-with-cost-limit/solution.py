from typing import List


class Solution:
    def generateValidStrings(self, n: int, k: int) -> List[str]:
        # Left-to-right backtracking. At index i a '0' is always allowed; a
        # '1' is allowed only when it does not follow another '1' and its
        # index i keeps the running cost <= k. Trying '0' before '1' emits
        # every valid string in lexicographic order. Recursion depth <= 12.
        out = []
        chars = []

        def build(index: int, prev_one: bool, cost: int) -> None:
            if index == n:
                out.append("".join(chars))
                return
            chars.append("0")
            build(index + 1, False, cost)
            chars.pop()
            if not prev_one and cost + index <= k:
                chars.append("1")
                build(index + 1, True, cost + index)
                chars.pop()

        build(0, False, 0)
        return out
