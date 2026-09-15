from typing import List


class Solution:
    def constructDistancedSequence(self, n: int) -> List[int]:
        # The target holds 1 once and every i >= 2 twice, exactly i apart.
        # Filling the first empty cell left to right while trying values n
        # down to 1 attempts prefixes in decreasing lexicographic
        # preference: a value is abandoned only when no valid completion
        # extends it, so the first complete sequence found is the
        # lexicographically largest.
        length = 2 * n - 1
        result = [0] * length
        used = [False] * (n + 1)

        def fill(pos: int) -> bool:
            if pos == length:
                return True
            if result[pos] != 0:
                return fill(pos + 1)
            for value in range(n, 0, -1):
                if used[value]:
                    continue
                if value == 1:
                    result[pos] = 1
                    used[1] = True
                    if fill(pos + 1):
                        return True
                    used[1] = False
                    result[pos] = 0
                elif pos + value < length and result[pos + value] == 0:
                    result[pos] = value
                    result[pos + value] = value
                    used[value] = True
                    if fill(pos + 1):
                        return True
                    used[value] = False
                    result[pos] = 0
                    result[pos + value] = 0
            return False

        fill(0)
        return result
