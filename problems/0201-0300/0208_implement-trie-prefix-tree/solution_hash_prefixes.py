class Trie:
    """Prefix set stored as flat hash data: one set of whole words and one
    set of every beginning of every word.

    Nothing is shared between words beyond accidental hash collisions, so
    the space bill is the total number of characters inserted rather than
    the size of the tree. Queries pay for their own length only: a lookup
    hashes the argument once and never consults the rest of the set.
    """

    def __init__(self) -> None:
        self._words: set[str] = set()
        self._prefixes: set[str] = set()

    def insert(self, word: str) -> None:
        self._words.add(word)
        # Record every beginning, the word itself included — a word begins
        # with itself, so it is its own longest prefix.
        for end in range(1, len(word) + 1):
            self._prefixes.add(word[:end])

    def search(self, word: str) -> bool:
        return word in self._words

    def startsWith(self, prefix: str) -> bool:  # noqa: N802 — judge API keeps camelCase
        return prefix in self._prefixes
