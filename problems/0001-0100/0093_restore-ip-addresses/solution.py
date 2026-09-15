from typing import List


class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:
        addresses: List[str] = []
        segments: List[str] = []

        def valid(part: str) -> bool:
            # A segment is 0-255 with no leading zero unless it is exactly "0".
            if len(part) > 1 and part[0] == "0":
                return False
            return int(part) <= 255

        def cut(start: int) -> None:
            remaining = 4 - len(segments)
            # What is left must feed 1-3 digits to every remaining segment;
            # at zero segments left this accepts only a fully consumed string.
            if not remaining <= len(s) - start <= 3 * remaining:
                return
            if remaining == 0:
                addresses.append(".".join(segments))
                return
            # Shorter cuts first: a dot sorts before any digit, so the output
            # lands in ascending lexicographic order.
            for length in range(1, 4):
                if start + length > len(s):
                    break
                part = s[start : start + length]
                if not valid(part):
                    continue
                segments.append(part)
                cut(start + length)
                segments.pop()

        cut(0)
        return addresses
