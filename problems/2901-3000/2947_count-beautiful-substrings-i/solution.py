from typing import List, Optional


class Solution:
    def beautifulSubstrings(self, s: str, k: int) -> int:
        # Straight from the definition: for each start, extend the substring
        # while maintaining the vowel-minus-consonant balance. Balance 0
        # means equal vowel and consonant counts, each equal to half the
        # length, so the divisibility test is ((L / 2) * (L / 2)) % k == 0.
        n = len(s)
        vowels = set("aeiou")
        total = 0
        for i in range(n):
            balance = 0
            for j in range(i, n):
                balance += 1 if s[j] in vowels else -1
                if balance == 0:
                    half = (j - i + 1) // 2
                    if (half * half) % k == 0:
                        total += 1
        return total
