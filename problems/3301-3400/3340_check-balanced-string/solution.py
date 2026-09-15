class Solution:
    def isBalanced(self, num: str) -> bool:
        # Only the two digit totals matter, and one pass can carry both at
        # once: add every digit sitting at an even index and subtract every
        # digit at an odd index. The even- and odd-index sums are equal
        # exactly when the signed total ends back at zero, so no second
        # pass or pair of accumulators is needed.
        balance = 0
        for i, c in enumerate(num):
            balance += int(c) if i % 2 == 0 else -int(c)
        return balance == 0
