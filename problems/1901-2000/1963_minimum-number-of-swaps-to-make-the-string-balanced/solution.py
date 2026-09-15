from typing import List


class Solution:
    def minSwaps(self, s: str) -> int:
        # One pass: track the running balance of '[' minus ']'. Whenever the
        # balance goes negative, the current prefix is impossible to balance
        # without a swap, so swap the offending ']' with the last '[' — which
        # is exactly what a single counter models by bumping balance up by 2.
        balance = 0
        swaps = 0
        for c in s:
            if c == "[":
                balance += 1
            else:
                balance -= 1
            if balance < 0:
                swaps += 1
                balance += 2
        return swaps
