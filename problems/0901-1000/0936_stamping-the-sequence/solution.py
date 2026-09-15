from typing import List


class Solution:
    def movesToStamp(self, stamp: str, target: str) -> List[int]:
        # Work backwards from target, where stamping forwards becomes erasing:
        # a window is erasable once every character in it either equals its
        # stamp counterpart or is already '?', because the last stamp to
        # cover a position always leaves the stamp's own letter there. Each
        # round takes the leftmost erasable window that still contains a
        # letter — erasing it can never block the remaining windows, since
        # turning letters into '?' only widens what matches — and blanks it.
        # A round that finds nothing while letters remain proves the target
        # unreachable; reversing the recorded indices yields the stamping
        # order.
        m, n = len(stamp), len(target)
        s = list(target)
        remaining = n
        recorded = []
        while remaining > 0:
            found = -1
            for i in range(n - m + 1):
                ok = True
                progress = False
                for j in range(m):
                    c = s[i + j]
                    if c == "?":
                        continue
                    if c != stamp[j]:
                        ok = False
                        break
                    progress = True
                if ok and progress:
                    found = i
                    break
            if found < 0:
                return []
            for j in range(m):
                if s[found + j] != "?":
                    s[found + j] = "?"
                    remaining -= 1
            recorded.append(found)
        return recorded[::-1]
