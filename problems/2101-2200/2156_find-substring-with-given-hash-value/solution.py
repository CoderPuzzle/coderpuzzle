from typing import List, Optional


class Solution:
    def subStrHash(self, s: str, power: int, modulo: int, k: int, hashValue: int) -> str:
        n = len(s)

        def val(c):
            return ord(c) - 96

        # Hash of the rightmost window, then roll leftwards.
        cur = 0
        pw = 1
        for j in range(k):
            cur = (cur + val(s[n - k + j]) * pw) % modulo
            pw = pw * power % modulo
        top = pow(power, k - 1, modulo)
        answer = s[n - k :] if cur == hashValue else ""
        for i in range(n - k - 1, -1, -1):
            cur = ((cur - val(s[i + k]) * top) * power + val(s[i])) % modulo
            if cur == hashValue:
                answer = s[i : i + k]  # scanning right-to-left keeps the leftmost match
        return answer
