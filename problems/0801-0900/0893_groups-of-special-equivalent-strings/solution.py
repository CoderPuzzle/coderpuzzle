from typing import List


class Solution:
    def numSpecialEquivGroups(self, words: List[str]) -> int:
        # Swaps never mix parities: even-indexed letters only trade with
        # even-indexed ones, odd with odd, so a word is exactly its two
        # sorted halves. The set counts distinct (even, odd) signatures.
        seen = set()
        for word in words:
            even = "".join(sorted(word[0::2]))
            odd = "".join(sorted(word[1::2]))
            seen.add(even + "#" + odd)
        return len(seen)
