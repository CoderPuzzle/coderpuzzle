class Solution:
    def balancedStringSplit(self, s: str) -> int:
        # +1 for L, -1 for R: every return to zero is one more balanced
        # piece, and cutting at each is the finest valid split.
        balance = 0
        pieces = 0
        for ch in s:
            balance += 1 if ch == "L" else -1
            if balance == 0:
                pieces += 1
        return pieces
