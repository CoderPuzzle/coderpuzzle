from typing import List


class Solution:
    def minArea(self, image: List[List[str]], x: int, y: int) -> int:
        # The region is connected, so its projection on each axis is one
        # contiguous range: every row between the topmost and bottommost
        # black row holds a black pixel, and likewise for columns. Each
        # "does this line hold a black pixel" predicate therefore flips
        # exactly once around the known black pixel (x, y).
        def has_black_row(r):
            return "1" in image[r]

        def has_black_col(c):
            return any(row[c] == "1" for row in image)

        # First line in [lo, hi] that is black; has(hi) always holds because
        # the range brackets the line through (x, y) itself.
        def first_black(lo, hi, has):
            while lo < hi:
                mid = (lo + hi) // 2
                if has(mid):
                    hi = mid
                else:
                    lo = mid + 1
            return lo

        # Last line in [lo, hi] that is black.
        def last_black(lo, hi, has):
            while lo < hi:
                mid = (lo + hi + 1) // 2
                if has(mid):
                    lo = mid
                else:
                    hi = mid - 1
            return lo

        top = first_black(0, x, has_black_row)
        bottom = last_black(x, len(image) - 1, has_black_row)
        left = first_black(0, y, has_black_col)
        right = last_black(y, len(image[0]) - 1, has_black_col)
        # The smallest enclosing rectangle is the cross of the two spans.
        return (bottom - top + 1) * (right - left + 1)
