from typing import List, Optional


class Solution:
    def boldWords(self, words: List[str], s: str) -> str:
        # Mark every position of s covered by any keyword occurrence.
        n = len(s)
        mask = [False] * n
        for word in words:
            # Restart one past each hit so self-overlapping occurrences
            # ("aa" inside "aaa") are all found.
            start = s.find(word)
            while start != -1:
                for i in range(start, start + len(word)):
                    mask[i] = True
                start = s.find(word, start + 1)
        # Wrap each maximal run of marked positions in exactly one pair.
        out = []
        for i in range(n):
            if mask[i] and (i == 0 or not mask[i - 1]):
                out.append("<b>")
            elif not mask[i] and i > 0 and mask[i - 1]:
                out.append("</b>")
            out.append(s[i])
        if n > 0 and mask[n - 1]:
            out.append("</b>")
        return "".join(out)
