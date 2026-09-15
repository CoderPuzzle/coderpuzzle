from typing import List, Optional


class _Node:
    """One trie node: 26 child slots indexed by ``ord(c) - ord('a')`` plus a
    whole-word terminator flag."""

    __slots__ = ("children", "end")

    def __init__(self) -> None:
        self.children: List[Optional[_Node]] = [None] * 26
        self.end = False


class Trie:
    """Prefix tree with a fixed 26-slot child array per node.

    Every operation walks one node per character; nodes are created lazily on
    the first insert that needs them. `end` marks that a complete word
    terminates at the node — the only difference between `search` (requires
    the flag) and `startsWith` (only requires the walk to succeed).
    """

    def __init__(self) -> None:
        self.root = _Node()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            index = ord(ch) - 97
            child = node.children[index]
            if child is None:
                child = _Node()
                node.children[index] = child
            node = child
        node.end = True

    def _walk(self, s: str) -> Optional[_Node]:
        node = self.root
        for ch in s:
            node = node.children[ord(ch) - 97]
            if node is None:
                return None
        return node

    def search(self, word: str) -> bool:
        node = self._walk(word)
        return node is not None and node.end

    def startsWith(self, prefix: str) -> bool:  # noqa: N802 — LeetCode API
        return self._walk(prefix) is not None
