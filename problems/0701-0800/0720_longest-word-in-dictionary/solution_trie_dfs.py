from typing import List, Optional


class _Node:
    __slots__ = ("children", "end")

    def __init__(self):
        self.children = {}
        self.end = False


class Solution:
    def longestWord(self, words: List[str]) -> str:
        # The trie stores every word once; a node's `end` marks where a word
        # stops. Walking only through `end` nodes keeps every spelled prefix
        # a word, so each path the walk takes is a buildable word.
        root = _Node()
        for word in words:
            node = root
            for character in word:
                node = node.children.setdefault(character, _Node())
            node.end = True

        best = ""

        def walk(node, path):
            nonlocal best
            # Strictly longer wins; among equal lengths the smaller word
            # wins — compared explicitly, never via child order.
            if len(path) > len(best) or (len(path) == len(best) and path < best):
                best = path
            for character, child in node.children.items():
                if child.end:
                    walk(child, path + character)

        walk(root, "")
        # Nothing buildable at all: the statement's empty-string answer.
        return best
