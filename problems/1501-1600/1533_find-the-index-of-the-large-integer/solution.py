from typing import List, Optional


class Solution:
    def getIndex(self, reader: ArrayReader) -> int:
        # Divide and conquer: compare two equal-length halves of the
        # current range and recurse into whichever sums higher — the
        # large entry inflates exactly one side. An odd-length range
        # peels off its middle element first; a tied comparison of the
        # remaining equal-length halves means that peeled element is the
        # large one.
        def solve(l: int, r: int) -> int:
            if l == r:
                return l
            length = r - l + 1
            mid = (l + r) // 2
            if length % 2 == 0:
                cmp = reader.compareSub(l, mid, mid + 1, r)
                return solve(l, mid) if cmp > 0 else solve(mid + 1, r)
            cmp = reader.compareSub(l, mid - 1, mid + 1, r)
            if cmp == 0:
                return mid
            return solve(l, mid - 1) if cmp > 0 else solve(mid + 1, r)

        return solve(0, reader.length() - 1)
