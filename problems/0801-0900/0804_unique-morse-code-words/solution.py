from typing import List

# Morse code of "a".."z" in alphabetical order; a letter's entry sits at
# ord(c) - ord("a").
MORSE = (
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
)


class Solution:
    def uniqueMorseRepresentations(self, words: List[str]) -> int:
        # A word's transformation is its letters' codes joined in order; the
        # set counts distinct results, so equal transformations fold.
        seen = set()
        for word in words:
            seen.add("".join(MORSE[ord(c) - ord("a")] for c in word))
        return len(seen)
