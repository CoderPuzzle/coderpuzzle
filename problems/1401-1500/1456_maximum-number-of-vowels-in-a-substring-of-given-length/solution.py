from typing import List, Optional


class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        vowels = set("aeiou")
        # count vowels of the first window once; afterwards only the
        # entering letter (i) and the leaving letter (i-k) can change it
        count = sum(1 for c in s[:k] if c in vowels)
        best = count
        for i in range(k, len(s)):
            if s[i] in vowels:
                count += 1
            if s[i - k] in vowels:
                count -= 1
            if count > best:
                best = count
        return best
