from typing import List, Optional


def _devowel(low: str) -> str:
    """Blank out the vowels of an already-lowercase word."""
    return "".join("*" if c in "aeiou" else c for c in low)


class Solution:
    def spellchecker(self, wordlist: List[str], queries: List[str]) -> List[str]:
        # One pass over the wordlist builds all three lookups; setdefault
        # keeps the FIRST word claiming each key — first-match-wins.
        exact = set(wordlist)
        by_lower = {}
        by_devowel = {}
        for w in wordlist:
            low = w.lower()
            by_lower.setdefault(low, w)
            by_devowel.setdefault(_devowel(low), w)
        # Each query walks the tiers in precedence order: exact echo, then
        # case-insensitive, then vowel-blind, then "".
        answer = []
        for q in queries:
            if q in exact:
                answer.append(q)
                continue
            low = q.lower()
            hit = by_lower.get(low)
            if hit is None:
                hit = by_devowel.get(_devowel(low), "")
            answer.append(hit)
        return answer
