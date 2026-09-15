from typing import List, Optional


class Solution:
    def areSentencesSimilar(self, sentence1: List[str], sentence2: List[str], similarPairs: List[List[str]]) -> bool:
        # Different lengths can never be similar.
        if len(sentence1) != len(sentence2):
            return False

        # Both orientations enter the set: the relation is symmetric, so one
        # ordered lookup answers "was this pair declared?".
        declared = set()
        for x, y in similarPairs:
            declared.add((x, y))
            declared.add((y, x))

        for a, b in zip(sentence1, sentence2):
            # A word is always similar to itself; anything else must be a
            # declared pair. Nothing chains: big~large and large~huge never
            # make big~huge.
            if a != b and (a, b) not in declared:
                return False
        return True
