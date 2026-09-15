from typing import List


class _Node:
    """One trie node: 26 child slots indexed by ``ord(c) - ord('a')`` plus a
    whole-word terminator flag."""

    __slots__ = ("children", "end")

    def __init__(self) -> None:
        self.children: list[_Node | None] = [None] * 26
        self.end = False


class MagicDictionary:
    """The dictionary spelled down a trie; each buildDict REPLACES the
    previous tree, so search only ever sees the latest call's words.

    `search` descends once with a one-change budget: the child
    holding the query's own letter continues for free, any other child
    spends the change, and success means a flagged node at the query's end
    with the change spent.
    """

    def __init__(self) -> None:
        self.root = _Node()

    def buildDict(self, dictionary: List[str]) -> None:
        root = _Node()
        for word in dictionary:
            node = root
            for ch in word:
                slot = ord(ch) - 97
                child = node.children[slot]
                if child is None:
                    child = _Node()
                    node.children[slot] = child
                node = child
            node.end = True
        self.root = root

    def _descend(self, node: _Node, word: str, index: int, edits_left: int) -> bool:
        if index == len(word):
            return node.end and edits_left == 0
        wanted = ord(word[index]) - 97
        for slot, child in enumerate(node.children):
            if child is not None:
                remaining = edits_left
                if slot != wanted:
                    remaining -= 1
                if remaining >= 0 and self._descend(child, word, index + 1, remaining):
                    return True
        return False

    def search(self, searchWord: str) -> bool:
        return self._descend(self.root, searchWord, 0, 1)
