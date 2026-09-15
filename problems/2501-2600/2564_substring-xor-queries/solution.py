from typing import List


class Solution:
    def substringXorQueries(self, s: str, queries: List[List[int]]) -> List[List[int]]:
        # first ^ second <= 2^30 - 1 (both fit under 10^9), so only
        # substrings of at most 30 characters can ever match a query.
        # Sweeping lengths ascending records each decoded value the first
        # time it is seen, which is precisely the crawl-grammar pick:
        # shortest length, ties broken by the leftmost start.
        best = {}
        n = len(s)
        for length in range(1, min(30, n) + 1):
            for left in range(n - length + 1):
                if s[left] == "0" and length > 1:
                    # "0xxx" decodes to xxx's value, which the previous,
                    # shorter pass already handled.
                    continue
                val = int(s[left : left + length], 2)
                if val not in best:
                    best[val] = [left, left + length - 1]
        return [best.get(first ^ second, [-1, -1]) for first, second in queries]
