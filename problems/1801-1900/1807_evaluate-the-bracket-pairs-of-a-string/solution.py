from typing import List


class Solution:
    def evaluate(self, s: str, knowledge: List[List[str]]) -> str:
        # One left-to-right pass: a '(' hands control to the matching ')',
        # the enclosed key goes through the map, everything else is copied
        # verbatim. Values are bracket-free, so nothing emitted is ever
        # re-examined.
        known = {key: value for key, value in knowledge}
        out = []
        i, n = 0, len(s)
        while i < n:
            if s[i] == "(":
                j = s.index(")", i)
                out.append(known.get(s[i + 1 : j], "?"))
                i = j + 1
            else:
                out.append(s[i])
                i += 1
        return "".join(out)
