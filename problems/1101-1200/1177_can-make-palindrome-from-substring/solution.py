from typing import List, Optional


class Solution:
    def canMakePaliQueries(self, s: str, queries: List[List[int]]) -> List[bool]:
        n = len(s)
        # prefix[i] = bitmask of parities of letter counts in s[:i]
        prefix = [0] * (n + 1)
        for i, ch in enumerate(s):
            prefix[i + 1] = prefix[i] ^ (1 << (ord(ch) - ord("a")))
        answer = []
        for left, right, k in queries:
            mask = prefix[right + 1] ^ prefix[left]
            odd = bin(mask).count("1")
            answer.append(odd // 2 <= k)
        return answer
