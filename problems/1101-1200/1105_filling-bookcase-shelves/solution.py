from typing import List, Optional


class Solution:
    def minHeightShelves(self, books: List[List[int]], shelfWidth: int) -> int:
        # Order is fixed and each shelf holds a contiguous run, so the only
        # freedom is where boundaries fall: dp[i] = best height for the first
        # i books, with dp[0] = 0 as the empty base.
        count = len(books)
        dp = [0] * (count + 1)
        for i in range(1, count + 1):
            # Grow the last shelf of the prefix backwards from book i-1,
            # accumulating width and the run's max height.
            width = 0
            height = 0
            dp[i] = float("inf")
            j = i - 1
            while j >= 0:
                thickness, book_height = books[j]
                width += thickness
                # Earlier books only widen the run further: stop here.
                if width > shelfWidth:
                    break
                height = max(height, book_height)
                # Books j..i-1 form the last shelf at cost dp[j] + height.
                dp[i] = min(dp[i], dp[j] + height)
                j -= 1
        return dp[count]
