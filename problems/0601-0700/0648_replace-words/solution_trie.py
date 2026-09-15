from typing import List


class _Node:
    __slots__ = ("children", "end")

    def __init__(self):
        self.children = {}
        self.end = False


class Solution:
    def replaceWords(self, dictionary: List[str], sentence: str) -> str:
        # The trie stores every root once; a node's `end` marks that a root
        # stops exactly there. Walking a word's own letters visits its
        # prefixes shortest first, so the first `end` on the path is the
        # shortest matching root — no per-length retries, and no length cap:
        # the tree has no branches deeper than the longest root anyway.
        trie = _Node()
        for root in dictionary:
            node = trie
            for letter in root:
                node = node.children.setdefault(letter, _Node())
            node.end = True
        # A walk that falls off the tree, or finishes without ever reaching
        # an `end`, found no root prefix — the word stands for itself.
        replaced = []
        for word in sentence.split(" "):
            node = trie
            replacement = word
            for length, letter in enumerate(word, 1):
                node = node.children.get(letter)
                if node is None:
                    break
                if node.end:
                    replacement = word[:length]
                    break
            replaced.append(replacement)
        return " ".join(replaced)
