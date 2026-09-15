from typing import Dict, List


class MagicDictionary:
    """Words grouped by length; each buildDict REPLACES the previous
    dictionary, so search only ever sees the latest call's words.

    `search` compares the search word against every stored word of the
    same length and counts differing positions: a different length is
    simply no match, and true requires exactly one difference.
    """

    def __init__(self) -> None:
        self.buckets: Dict[int, List[str]] = {}

    def buildDict(self, dictionary: List[str]) -> None:
        buckets: Dict[int, List[str]] = {}
        for word in dictionary:
            buckets.setdefault(len(word), []).append(word)
        self.buckets = buckets

    def search(self, searchWord: str) -> bool:
        for word in self.buckets.get(len(searchWord), []):
            mismatches = 0
            for candidate, wanted in zip(word, searchWord):
                if candidate != wanted:
                    mismatches += 1
                    if mismatches > 1:
                        break
            if mismatches == 1:
                return True
        return False
