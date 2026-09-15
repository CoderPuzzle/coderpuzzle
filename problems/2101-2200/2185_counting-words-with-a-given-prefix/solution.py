from typing import List


class Solution:
    def prefixCount(self, words: List[str], pref: str) -> int:
        # Straight scan: count the words whose leading characters match
        # pref exactly.
        return sum(1 for word in words if word.startswith(pref))
