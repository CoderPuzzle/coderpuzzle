from typing import List, Optional


class Solution:
    def decodeAtIndex(self, s: str, k: int) -> str:
        # Forward pass computes the decoded tape length; the backward pass
        # reduces k through each repetition/letter until it lands on a letter.
        length = 0
        for ch in s:
            if ch.isdigit():
                length *= int(ch)
            else:
                length += 1
        for ch in reversed(s):
            if ch.isdigit():
                length //= int(ch)
                k = (k - 1) % length + 1  # k-th char of D == k-th char of prefix
            else:
                if k == length:
                    return ch
                length -= 1
        return s[0]
