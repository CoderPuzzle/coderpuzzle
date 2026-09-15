from typing import Dict, List, Optional


class _TrieNode:
    """One trie node: 26 child slots indexed by ``ord(c) - ord('a')`` plus
    the indices of every word whose path crosses it, appended in increasing
    order."""

    __slots__ = ("children", "indices")

    def __init__(self) -> None:
        self.children: List[Optional[_TrieNode]] = [None] * 26
        self.indices: List[int] = []


class WordFilter:
    """Two tries, one word list per node: a prefix trie spelling every word
    forward and a suffix trie spelling every word reversed, so a suffix
    reads down it front to back. Words are inserted in index order, so
    every node's list ascends, and f() walks pref down the first
    trie and suff reversed down the second, then merges the two hit nodes'
    lists from their tails -- the first equal pair is the largest shared
    index, and a walk that falls off its trie means no word matches that
    half, answering -1.
    """

    def __init__(self, words: List[str]) -> None:
        self.prefixes = _TrieNode()
        self.suffixes = _TrieNode()
        for index, word in enumerate(words):
            node = self.prefixes
            for character in word:
                slot = ord(character) - 97
                child = node.children[slot]
                if child is None:
                    child = _TrieNode()
                    node.children[slot] = child
                node = child
                node.indices.append(index)
            node = self.suffixes
            for character in reversed(word):
                slot = ord(character) - 97
                child = node.children[slot]
                if child is None:
                    child = _TrieNode()
                    node.children[slot] = child
                node = child
                node.indices.append(index)

    def f(self, pref: str, suff: str) -> int:
        forward = self._walkForward(pref)
        if forward is None:
            return -1
        backward = self._walkBackward(suff)
        if backward is None:
            return -1
        front = forward.indices
        back = backward.indices
        i, j = len(front) - 1, len(back) - 1
        while i >= 0 and j >= 0:
            if front[i] == back[j]:
                return front[i]
            if front[i] > back[j]:
                i -= 1
            else:
                j -= 1
        return -1

    def _walkForward(self, pref: str) -> Optional[_TrieNode]:
        node = self.prefixes
        for character in pref:
            node = node.children[ord(character) - 97]
            if node is None:
                return None
        return node

    def _walkBackward(self, suff: str) -> Optional[_TrieNode]:
        node = self.suffixes
        for character in reversed(suff):
            node = node.children[ord(character) - 97]
            if node is None:
                return None
        return node
