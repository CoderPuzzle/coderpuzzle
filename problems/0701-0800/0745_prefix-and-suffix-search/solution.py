from typing import Dict, List


class WordFilter:
    """One hash entry per (prefix, suffix) pair, built once at construction.

    For each word, every prefix of the word is joined to every suffix
    through a '#' -- no word or query can contain it, since both are
    lowercase letters only -- and the entry holds the word's index.
    Processing words left to right makes later words overwrite earlier
    ones, so every entry ends up holding the largest matching index, and
    f() is a single lookup that answers -1 when the key is absent.
    """

    def __init__(self, words: List[str]) -> None:
        self.weights: Dict[str, int] = {}
        for index, word in enumerate(words):
            for prefix in range(len(word) + 1):
                head = word[:prefix]
                for suffix in range(len(word) + 1):
                    self.weights[head + "#" + word[suffix:]] = index

    def f(self, pref: str, suff: str) -> int:
        return self.weights.get(pref + "#" + suff, -1)
