from typing import List, Optional


class Solution:
    def uncommonFromSentences(self, s1: str, s2: str) -> List[str]:
        # The pinned order is s1's words then s2's, and joining the
        # sentences with one space makes a single stream in that order.
        words = (s1 + " " + s2).split()
        counts = {}
        for word in words:
            counts[word] = counts.get(word, 0) + 1
        # An uncommon word occurs exactly once overall, so emitting it at
        # its only occurrence is first-appearance order within each
        # sentence — no sort, no seen-list, no hash iteration order.
        return [word for word in words if counts[word] == 1]
