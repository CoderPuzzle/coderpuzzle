from typing import List


class Solution:
    def printVertically(self, s: str) -> List[str]:
        # Row k takes character k of every word in order; short words pad
        # with a space, and trailing spaces are trimmed off each row.
        words = s.split(" ")
        height = max(len(word) for word in words)
        rows = []
        for k in range(height):
            row = "".join(word[k] if k < len(word) else " " for word in words)
            rows.append(row.rstrip())
        return rows
