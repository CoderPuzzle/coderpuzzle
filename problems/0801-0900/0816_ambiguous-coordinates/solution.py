from typing import List, Optional


class Solution:
    def ambiguousCoordinates(self, s: str) -> List[str]:
        def forms(t: str) -> List[str]:
            # Every valid rendering of the digit run t, in the statement's
            # pinned order: decimal forms first, point moving right, then the
            # plain integer last.
            out: List[str] = []
            for k in range(1, len(t)):
                whole, frac = t[:k], t[k:]
                # The whole part may not open with '0' unless it is exactly
                # "0", and the fractional part may not end in '0'.
                if len(whole) > 1 and whole[0] == "0":
                    continue
                if frac[-1] == "0":
                    continue
                out.append(whole + "." + frac)
            if len(t) == 1 or t[0] != "0":
                out.append(t)
            return out

        t = s[1:-1]
        result: List[str] = []
        for i in range(1, len(t)):
            lefts = forms(t[:i])
            if not lefts:
                continue
            rights = forms(t[i:])
            if not rights:
                continue
            for a in lefts:
                for b in rights:
                    result.append("(" + a + ", " + b + ")")
        return result
