from collections import Counter


class Solution:
    def minimumDeletions(self, word: str, k: int) -> int:
        # Deletion only lowers counts, so some kept letter ends up with the
        # smallest final frequency x and every other kept letter must land
        # in [x, x + k]: letters above the window donate their excess,
        # letters below it vanish entirely. Trying each letter's original
        # count as x covers the optimum, since the winning x is always a
        # count that some letter keeps for free.
        counts = Counter(word)
        best = len(word)
        for base in counts.values():
            deletions = 0
            for cnt in counts.values():
                if cnt < base:
                    deletions += cnt
                elif cnt > base + k:
                    deletions += cnt - (base + k)
            best = min(best, deletions)
        return best
