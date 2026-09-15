from collections import Counter


class Solution:
    def numTilePossibilities(self, tiles: str) -> int:
        # Counter keyed by distinct letter, not a permutation of indices:
        # identical tiles collapse into one branch, so a sequence built from
        # duplicate letters is only ever counted once.
        counts = Counter(tiles)

        def backtrack() -> int:
            total = 0
            for letter in list(counts.keys()):
                if counts[letter] == 0:
                    continue
                # Placing this letter is itself one new, distinct sequence.
                counts[letter] -= 1
                total += 1 + backtrack()
                counts[letter] += 1
            return total

        return backtrack()
