from typing import List, Optional


class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        # last occurrence of a/b/c so far; -1 = letter not seen yet
        last = [-1, -1, -1]
        count = 0
        for i, ch in enumerate(s):
            if ch == "a" or ch == "b" or ch == "c":
                last[ord(ch) - ord("a")] = i
            # substring s[l..i] is valid iff l <= min(last): every such left
            # endpoint yields one valid substring ending at i (0 until all seen)
            count += min(last[0], last[1], last[2]) + 1
        return count
