class Solution:
    def halvesAreAlike(self, s: str) -> bool:
        # Only the vowel totals of the two halves matter — which vowel it
        # is, where it sits, and whether it is upper- or lowercase are all
        # irrelevant. One pass with a single counter: +1 for every vowel in
        # the first half, -1 for every vowel in the second; equal totals
        # land the counter back at exactly zero.
        vowels = set("aeiouAEIOU")
        half = len(s) // 2
        balance = 0
        for i, c in enumerate(s):
            if c in vowels:
                balance += 1 if i < half else -1
        return balance == 0
