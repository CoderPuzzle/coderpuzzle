from collections import Counter


class Solution:
    def minDeletions(self, s: str) -> int:
        # Count how often each letter occurs, then process the frequencies
        # from largest to smallest. Whenever a frequency repeats a value we
        # have already committed to, shrink it by one deletion at a time
        # until it lands on an unused value (or hits zero, meaning that
        # letter is deleted away entirely).
        used = set()
        deletions = 0
        for freq in sorted(Counter(s).values(), reverse=True):
            while freq > 0 and freq in used:
                freq -= 1
                deletions += 1
            if freq > 0:
                used.add(freq)
        return deletions
