from typing import List


class Solution:
    def divisibilityArray(self, word: str, m: int) -> List[int]:
        # Rolling remainder over digit prefixes: if r was word[0..i-1] mod
        # m, then appending digit d gives (10*r + d) mod m, so each flag
        # costs one multiply-add-mod instead of re-parsing the prefix.
        # The intermediate 10*r + d tops out just above 10^10 (r < m <=
        # 10^9), far below the 2^53 limit where JS numbers stay exact.
        div = []
        rem = 0
        for ch in word:
            rem = (rem * 10 + (ord(ch) - 48)) % m
            div.append(1 if rem == 0 else 0)
        return div
