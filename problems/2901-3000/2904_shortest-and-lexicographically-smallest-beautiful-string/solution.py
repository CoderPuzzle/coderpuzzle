from typing import List, Optional


class Solution:
    def shortestBeautifulSubstring(self, s: str, k: int) -> str:
        # For a fixed left end i, extending right until the window first
        # holds exactly k ones yields the only shortest beautiful candidate
        # that starts at i: any earlier cut has fewer ones, and any later
        # cut with k ones is strictly longer.
        n = len(s)
        best = ""
        for i in range(n):
            ones = 0
            for j in range(i, n):
                if s[j] == "1":
                    ones += 1
                if ones == k:
                    candidate = s[i : j + 1]
                    if best == "" or (len(candidate), candidate) < (len(best), best):
                        best = candidate
                    break
        return best
