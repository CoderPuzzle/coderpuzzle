from typing import List


class Solution:
    def prefixConnected(self, words: List[str], k: int) -> int:
        # Sharing the first k characters is transitive, so each connected
        # group is exactly one k-prefix and counting groups of size >= 2
        # is counting prefixes that occur at least twice.
        counts = {}
        for word in words:
            if len(word) >= k:
                prefix = word[:k]
                counts[prefix] = counts.get(prefix, 0) + 1
        # A group needs at least two words, so prefixes seen once do not
        # count; the answer is at most n <= 5000, exact in any int width.
        return sum(1 for c in counts.values() if c >= 2)
