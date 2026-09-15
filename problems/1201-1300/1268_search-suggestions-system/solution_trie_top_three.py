class _Node:
    """One trie node: 26 child slots indexed by ``ord(c) - 97``; ``word`` is
    set when a products word ends here, ``top`` caches the best three words
    passing through the node once the merge phase fills it in."""

    __slots__ = ("children", "word", "top")

    def __init__(self) -> None:
        self.children: list[_Node | None] = [None] * 26
        self.word: str | None = None
        self.top: list[str] = []


class Solution:
    def suggestedProducts(self, products: list[str], searchWord: str) -> list[list[str]]:
        root = _Node()
        # spell every word down the tree; nodes appear only where needed
        for word in products:
            node = root
            for ch in word:
                index = ord(ch) - 97
                if node.children[index] is None:
                    node.children[index] = _Node()
                node = node.children[index]
            node.word = word

        # merge phase, deepest nodes first: a node's best three are its own
        # word — a prefix of every other word through it, hence the smallest
        # — followed by the children's lists in letter order; every existing
        # child already holds a non-empty list, so gathering stops by the
        # third child consulted
        order = []
        pending = [root]
        while pending:
            node = pending.pop()
            order.append(node)
            for child in node.children:
                if child is not None:
                    pending.append(child)
        for node in reversed(order):
            top = [] if node.word is None else [node.word]
            for child in node.children:
                if len(top) >= 3:
                    break
                if child is not None:
                    top.extend(child.top)
            node.top = top[:3]

        # a keystroke is one pointer move; once a slot is empty it stays
        # empty, because prefixes only ever grow
        result = []
        node = root
        for ch in searchWord:
            if node is not None:
                node = node.children[ord(ch) - 97]
            result.append(node.top if node is not None else [])
        return result
