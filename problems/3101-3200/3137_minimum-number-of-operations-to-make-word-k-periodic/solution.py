from collections import Counter


class Solution:
    def minimumOperationsToMakeKPeriodic(self, word: str, k: int) -> int:
        # An operation copies one existing k-block over another, so the set
        # of block contents only shrinks and every block must end up equal
        # to some original block. Keeping the most frequent one untouched,
        # each of the other blocks is fixed by a single copy.
        blocks = [word[i : i + k] for i in range(0, len(word), k)]
        return len(blocks) - max(Counter(blocks).values())
