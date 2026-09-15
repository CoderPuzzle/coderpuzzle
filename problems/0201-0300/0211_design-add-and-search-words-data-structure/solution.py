from typing import List, Optional


class _Node:
    """One trie node: 26 child slots indexed by ``ord(c) - ord('a')`` plus a
    whole-word terminator flag."""

    __slots__ = ("children", "end")

    def __init__(self) -> None:
        self.children: List[Optional[_Node]] = [None] * 26
        self.end = False


class WordDictionary:
    """Trie with backtracking search: a letter follows one child link, a dot
    fans out over every non-empty slot."""

    def __init__(self) -> None:
        self.root = _Node()

    def addWord(self, word: str) -> None:  # noqa: N802 — LeetCode API
        node = self.root
        for ch in word:
            index = ord(ch) - 97
            child = node.children[index]
            if child is None:
                child = _Node()
                node.children[index] = child
            node = child
        node.end = True

    def search(self, word: str) -> bool:
        def match(node: Optional[_Node], index: int) -> bool:
            if node is None:
                return False
            if index == len(word):
                return node.end
            ch = word[index]
            if ch == ".":
                return any(match(child, index + 1) for child in node.children)
            return match(node.children[ord(ch) - 97], index + 1)

        return match(self.root, 0)
