from typing import List, Optional


class Solution:
    def longestValidSubstring(self, word: str, forbidden: List[str]) -> int:
        banned = set(forbidden)
        max_len = max((len(s) for s in banned), default=0)
        n = len(word)
        left = 0
        ans = 0
        # Validity is hereditary (shrinking a valid window stays valid), so a
        # two-pointer sweep finds the longest valid substring.
        for right in range(n):
            # Only suffixes ending at right can be forbidden, and each is at
            # most max_len long (<= 10); nothing before the current left - 1
            # can matter since earlier occurrences were already excluded.
            start = max(right - max_len, left - 1)
            # Test suffixes shortest-first: the shortest match has the latest
            # start, so jumping left past it yields the largest window that
            # excludes every forbidden occurrence.
            for j in range(right, start, -1):
                if word[j : right + 1] in banned:
                    left = j + 1
                    break
            ans = max(ans, right - left + 1)
        return ans
