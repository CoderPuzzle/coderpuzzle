from typing import List, Optional


class Solution:
    def goodIndices(self, s: str) -> List[int]:
        # A matching substring must be exactly as long as i's decimal
        # representation, so every index has just one candidate: the
        # suffix of that length ending at i. Comparing that window
        # against str(i) decides the index — representations never
        # carry a leading zero, so a window like "01" fails plainly
        # against the real digits of i.
        res = []
        for i in range(len(s)):
            t = str(i)
            j = i - len(t) + 1
            if j >= 0 and s[j : i + 1] == t:
                res.append(i)
        return res
