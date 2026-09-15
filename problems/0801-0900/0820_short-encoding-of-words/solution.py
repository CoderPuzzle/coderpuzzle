from typing import List, Optional


class Solution:
    def minimumLengthEncoding(self, words: List[str]) -> int:
        # A word needs no slot of its own when another word ends with
        # it: start from every word, then discard strict suffixes.
        keep = set(words)
        for w in words:
            # Only proper suffixes (k >= 1) are removed, so w itself —
            # and duplicates of it — survive to share a single slot.
            for k in range(1, len(w)):
                keep.discard(w[k:])
        # Survivors are exactly the words no other word ends with; each
        # pays len + 1 for its terminating '#'.
        return sum(len(w) + 1 for w in keep)
