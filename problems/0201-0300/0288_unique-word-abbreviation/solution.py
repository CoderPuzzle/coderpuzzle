from typing import Dict, List, Set


def abbrev(word: str) -> str:
    # First letter + count of the letters between + last letter; a word of
    # one or two characters is an abbreviation of itself.
    if len(word) <= 2:
        return word
    return word[0] + str(len(word) - 2) + word[-1]


class ValidWordAbbr:
    """One abbreviation group per abbreviation, held as a set of words.

    `isUnique` applies the two-condition rule directly: the group for the
    query's abbreviation must be empty, or contain nothing but the query
    itself.
    """

    def __init__(self, dictionary: List[str]) -> None:
        # A set per abbreviation: listing "deer" twice must leave the
        # group {"deer"} — a word never collides with its own duplicates.
        self.groups: Dict[str, Set[str]] = {}
        for word in dictionary:
            self.groups.setdefault(abbrev(word), set()).add(word)

    def isUnique(self, word: str) -> bool:
        group = self.groups.get(abbrev(word))
        # No word with this abbreviation, or every such word is `word`.
        return group is None or group == {word}
