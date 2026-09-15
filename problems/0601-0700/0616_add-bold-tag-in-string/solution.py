from typing import List


class Solution:
    def addBoldTag(self, s: str, words: List[str]) -> str:
        # Every occurrence of every word paints its half-open interval onto a
        # boolean mask. Painting overlapping AND adjacent intervals onto one
        # mask merges them exactly as the two tag rules demand, so no interval
        # bookkeeping is needed. Each word is located by find-restart — search
        # again from one past every hit — because a single non-restarting
        # search would consume the overlapping occurrences ("aa" inside "aaa"
        # at both 0 and 1).
        n = len(s)
        bold = [False] * n
        for word in words:
            length = len(word)
            start = s.find(word)
            while start != -1:
                end = start + length
                bold[start:end] = [True] * length
                start = s.find(word, start + 1)
        parts = []
        for i, ch in enumerate(s):
            if bold[i] and (i == 0 or not bold[i - 1]):
                parts.append("<b>")
            parts.append(ch)
            if bold[i] and (i == n - 1 or not bold[i + 1]):
                parts.append("</b>")
        return "".join(parts)
