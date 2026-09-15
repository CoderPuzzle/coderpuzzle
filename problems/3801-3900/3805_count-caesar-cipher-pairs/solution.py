from typing import List


class Solution:
    def countPairs(self, words: List[str]) -> int:
        # Shifting a word by k adds k to every letter, so two words are
        # similar exactly when subtracting each word's own first letter
        # maps both onto the same normalized key: (c - word[0]) mod 26.
        counts = {}
        for word in words:
            base = ord(word[0])
            key = "".join(chr((ord(c) - base) % 26 + ord("a")) for c in word)
            counts[key] = counts.get(key, 0) + 1
        # Pairs live inside one class; n <= 10^5 bounds the total by
        # n(n-1)/2 < 5 * 10^9, exact in Python's arbitrary-width ints.
        return sum(c * (c - 1) // 2 for c in counts.values())
