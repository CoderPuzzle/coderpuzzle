from typing import List


class Solution:
    def longestIdealString(self, s: str, k: int) -> int:
        # best[c] = longest ideal subsequence seen so far that ends with
        # letter c. Appending s[i] to a chain ending in any letter within
        # ±k extends it by one; only the 26 per-letter maxima matter because
        # chains with the same last letter are interchangeable going forward.
        best = [0] * 26
        for ch in s:
            c = ord(ch) - ord("a")
            lo = max(0, c - k)
            hi = min(25, c + k)
            candidate = max(best[lo : hi + 1]) + 1
            if candidate > best[c]:
                best[c] = candidate
        return max(best)
