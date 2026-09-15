from typing import Dict, List


class StreamChecker:
    """Trie of the words plus the trail of nodes the stream suffixes reach;
    each query advances every trail node one edge and reseeds the root."""

    def __init__(self, words: List[str]) -> None:
        self.root: Dict[str, dict] = {}
        for word in words:
            node = self.root
            for ch in word:
                node = node.setdefault(ch, {})
            node["#"] = True
        self.nodes: List[dict] = [self.root]

    def query(self, letter: str) -> bool:
        advanced: List[dict] = []
        hit = False
        for node in self.nodes:  # index 0 is always the root
            child = node.get(letter)
            if child is not None:
                advanced.append(child)
                hit = hit or ("#" in child)
        self.nodes = [self.root, *advanced]
        return hit
