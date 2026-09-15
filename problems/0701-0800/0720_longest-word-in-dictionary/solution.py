from typing import List, Optional


class Solution:
    def longestWord(self, words: List[str]) -> str:
        # Sorted order visits every word after the word minus its last
        # character, so one sweep can grow the buildable set incrementally.
        best = ""
        buildable = set()
        for word in sorted(words):
            # Buildable by the statement's rule: the word minus its last
            # character is already buildable, and a lone letter carries the
            # empty prefix, so it needs nothing.
            if len(word) == 1 or word[:-1] in buildable:
                buildable.add(word)
                # Strictly longer only: among equal lengths the first word
                # in sorted order — the lexicographically smallest — wins.
                if len(word) > len(best):
                    best = word
        # Nothing buildable at all: the statement's empty-string answer.
        return best
