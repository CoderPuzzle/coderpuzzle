from typing import List, Optional


class Solution:
    def longestAwesome(self, s: str) -> int:
        # mask is a 10-bit number: bit d is 1 when digit d has appeared an
        # odd number of times in the prefix s[0:i+1]. first_seen maps a
        # prefix mask to the smallest index that produced it (mask 0 maps
        # to -1, the empty prefix before the string starts). Two prefixes
        # sharing a mask cancel out to all-even digit counts between them
        # (already rearrangeable into a palindrome); two prefixes whose
        # masks differ in exactly one bit cancel to a single odd count
        # (the lone middle character of an odd-length palindrome).
        first_seen = {0: -1}
        mask = 0
        best = 0
        for i, ch in enumerate(s):
            mask ^= 1 << (ord(ch) - ord("0"))
            if mask in first_seen:
                best = max(best, i - first_seen[mask])
            else:
                first_seen[mask] = i
            for digit in range(10):
                candidate = mask ^ (1 << digit)
                if candidate in first_seen:
                    best = max(best, i - first_seen[candidate])
        return best
