class Solution:
    def areOccurrencesEqual(self, s: str) -> bool:
        # Every present character must share one frequency, so the set of
        # the per-character counts has size one.
        from collections import Counter

        counts = Counter(s)
        return len(set(counts.values())) == 1
