from typing import List, Optional


class Solution:
    def maxFont(
        self,
        text: str,
        w: int,
        h: int,
        fonts: List[int],
        widths: List[List[int]],
        heights: List[int],
    ) -> int:
        def fits(index: int) -> bool:
            if heights[index] > h:
                return False
            row = widths[index]
            total = 0
            for ch in text:
                total += row[ord(ch) - ord("a")]
                if total > w:
                    return False
            return True

        # Fit is monotonic in the font index (widths/heights only grow), so
        # binary search the boundary between fitting and not fitting.
        lo, hi = 0, len(fonts) - 1
        answer = -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if fits(mid):
                answer = fonts[mid]
                lo = mid + 1
            else:
                hi = mid - 1
        return answer
