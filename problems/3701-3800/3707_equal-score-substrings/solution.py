from typing import List, Optional


class Solution:
    def scoreBalance(self, s: str) -> bool:
        # The total letter score lets every split compare a running prefix
        # against the remainder: the halves balance exactly when the running
        # score reaches half the total.
        total = sum(ord(ch) - ord("a") + 1 for ch in s)
        left = 0
        # Sweep the split points, growing the left side one letter at a time;
        # stopping before the final character keeps both halves non-empty.
        for i in range(len(s) - 1):
            left += ord(s[i]) - ord("a") + 1
            if 2 * left == total:
                return True
        return False
