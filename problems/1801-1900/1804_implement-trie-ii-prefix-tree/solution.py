class _TrieNode:
    __slots__ = ("children", "word_count", "prefix_count")

    def __init__(self):
        self.children = {}
        self.word_count = 0
        self.prefix_count = 0


class Trie:
    """A trie whose nodes each count the inserted instances ending at the
    node (word_count) and passing through it (prefix_count). insert walks
    the word creating children on demand, bumping prefix_count along the
    path and word_count at the terminal; the two count queries walk their
    string as far as nodes exist and read the matching counter, answering
    0 when the walk falls off the trie. erase — guaranteed by the
    constraints to name a present word — confirms a live instance with a
    first walk, then decrements the same counters on a second; nodes left
    at zero stay in place, since no live instance crosses them anymore.
    """

    def __init__(self):
        self.root = _TrieNode()

    def insert(self, word: str):
        node = self.root
        for character in word:
            child = node.children.get(character)
            if child is None:
                child = _TrieNode()
                node.children[character] = child
            node = child
            node.prefix_count += 1
        node.word_count += 1

    def countWordsEqualTo(self, word: str) -> int:
        node = self.root
        for character in word:
            node = node.children.get(character)
            if node is None:
                return 0
        return node.word_count

    def countWordsStartingWith(self, prefix: str) -> int:
        node = self.root
        for character in prefix:
            node = node.children.get(character)
            if node is None:
                return 0
        return node.prefix_count

    def erase(self, word: str):
        node = self.root
        for character in word:
            node = node.children.get(character)
            if node is None:
                return
        if node.word_count == 0:
            return
        node = self.root
        for character in word:
            node = node.children[character]
            node.prefix_count -= 1
        node.word_count -= 1
