from typing import List


class Solution:
    def vowelStrings(self, words: List[str], queries: List[List[int]]) -> List[int]:
        # Prefix sums over the vowel-string marks: good[i+1] counts the
        # strings among words[0..i] that start and end with a vowel, so a
        # query [l, r] costs one subtraction. Counts stay below words
        # length <= 10^5, well inside 32 bits.
        vowels = frozenset("aeiou")
        marks = [1 if w[0] in vowels and w[-1] in vowels else 0 for w in words]
        prefix = [0]
        for flag in marks:
            prefix.append(prefix[-1] + flag)
        return [prefix[q[1] + 1] - prefix[q[0]] for q in queries]
