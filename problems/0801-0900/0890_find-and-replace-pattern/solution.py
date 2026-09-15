from typing import List, Optional


class Solution:
    def findAndReplacePattern(self, words: List[str], pattern: str) -> List[str]:
        def signature(s: str) -> List[int]:
            # Index each letter by its first appearance in s: "abb" -> [0, 1, 1].
            first = {}
            return [first.setdefault(ch, len(first)) for ch in s]

        # Equal signatures are exactly bijective matchability for
        # equal-length strings, so no letter-to-letter maps are needed.
        target = signature(pattern)
        return [w for w in words if signature(w) == target]
