from typing import List, Optional


class Solution:
    def beautifulSubstrings(self, s: str, k: int) -> int:
        # A beautiful substring has equal vowels and consonants (the prefix
        # vowel-minus-consonant balance is equal at both ends) and with both
        # counts equal to x, x*x % k == 0 holds exactly when x is a multiple
        # of m, the least x >= 1 with x*x % k == 0 — for k = p1^a1 * p2^a2 *
        # ... that is the product of p^ceil(a/2). So a substring counts iff
        # its end balances match and its length is a multiple of 2m, i.e.
        # both end indices agree modulo 2m. One pass counts earlier prefixes
        # with the same (balance, index mod 2m) key.
        m = 1
        rest = k
        p = 2
        while p * p <= rest:
            if rest % p == 0:
                a = 0
                while rest % p == 0:
                    rest //= p
                    a += 1
                m *= p ** ((a + 1) // 2)
            p += 1
        if rest > 1:
            m *= rest
        period = 2 * m
        seen = {(0, 0): 1}
        balance = 0
        total = 0
        for i, ch in enumerate(s, 1):
            balance += 1 if ch in "aeiou" else -1
            key = (balance, i % period)
            total += seen.get(key, 0)
            seen[key] = seen.get(key, 0) + 1
        return total
