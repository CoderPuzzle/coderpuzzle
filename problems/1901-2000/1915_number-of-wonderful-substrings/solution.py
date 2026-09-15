from typing import List, Optional


class Solution:
    def wonderfulSubstrings(self, word: str) -> int:
        # count[m] = prefixes seen so far with parity mask m (10 bits, letters a..j).
        # count[0] = 1 seeds the empty prefix so substrings starting at index 0 count.
        count = [0] * 1024
        count[0] = 1
        mask = 0
        total = 0
        for ch in word:
            mask ^= 1 << (ord(ch) - ord("a"))
            # Substring between two prefixes with masks P, Q has parity P^Q:
            # wonderful iff P == Q (all even) ...
            total += count[mask]
            # ... or P^Q is a single bit (exactly one odd letter).
            for b in range(10):
                total += count[mask ^ (1 << b)]
            # Increment AFTER counting so each pair uses an earlier prefix —
            # every substring is counted exactly once.
            count[mask] += 1
        return total
