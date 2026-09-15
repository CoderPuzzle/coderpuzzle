from typing import List


class AutocompleteSystem:
    def __init__(self, sentences: List[str], times: List[int]) -> None:
        self.root = {}
        for sentence, time in zip(sentences, times):
            node = self.root
            for ch in sentence:
                node = node.setdefault(ch, {})
            node["#"] = node.get("#", 0) + time
        self.node = self.root
        self.typed = []

    def input(self, c: str) -> List[str]:
        if c == "#":
            sentence = "".join(self.typed)
            node = self.root
            for ch in sentence:
                node = node.setdefault(ch, {})
            node["#"] = node.get("#", 0) + 1
            self.node = self.root
            self.typed = []
            return []
        self.typed.append(c)
        if self.node is None or c not in self.node:
            self.node = None
            return []
        self.node = self.node[c]
        matches = []
        self._collect(self.node, "".join(self.typed), matches)
        matches.sort(key=lambda match: (-match[1], match[0]))
        return [sentence for sentence, _ in matches[:3]]

    def _collect(self, node: dict, prefix: str, out: list) -> None:
        for key, child in node.items():
            if key == "#":
                out.append((prefix, child))
            else:
                self._collect(child, prefix + key, out)
