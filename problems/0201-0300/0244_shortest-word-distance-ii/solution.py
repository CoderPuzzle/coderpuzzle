from typing import Dict, List


class WordDistance:
    """One index list per word, built once at construction.

    `shortest` walks the two sorted index lists in lockstep, always
    advancing the smaller index — every pair that can still improve the
    gap gets examined, so one merge finds the closest pair.
    """

    def __init__(self, wordsDict: List[str]) -> None:
        # Appending left to right keeps each word's indices ascending —
        # the walk relies on both lists being sorted.
        self.positions: Dict[str, List[int]] = {}
        for index, word in enumerate(wordsDict):
            self.positions.setdefault(word, []).append(index)

    def shortest(self, word1: str, word2: str) -> int:
        first = self.positions[word1]
        second = self.positions[word2]
        best = abs(first[0] - second[0])
        i = 0
        j = 0
        while i < len(first) and j < len(second):
            gap = abs(first[i] - second[j])
            if gap < best:
                best = gap
            # Advancing the larger index can only widen the gap, so the
            # smaller one takes the step.
            if first[i] < second[j]:
                i += 1
            else:
                j += 1
        return best
