from typing import List, Optional


class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        length = len(p)
        n = len(s)
        result = []
        if n < length:
            return result
        delta = [0] * 128  # need[c] - window[c]
        for ch in p:
            delta[ord(ch)] += 1
        diff = sum(1 for d in delta if d != 0)
        for i in range(n):
            c = ord(s[i])
            if delta[c] == 0:
                diff += 1
            delta[c] -= 1
            if delta[c] == 0:
                diff -= 1
            if i >= length:
                out = ord(s[i - length])
                if delta[out] == 0:
                    diff += 1
                delta[out] += 1
                if delta[out] == 0:
                    diff -= 1
            if i >= length - 1 and diff == 0:
                result.append(i - length + 1)
        return result
