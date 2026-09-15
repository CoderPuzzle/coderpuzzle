from typing import List


class Solution:
    def generateSentences(self, synonyms: List[List[str]], text: str) -> List[str]:
        # Union-find over every word mentioned in a pair.
        parent = {}

        def find(x):
            parent.setdefault(x, x)
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        for a, b in synonyms:
            parent[find(a)] = find(b)

        groups = {}
        for word in list(parent):
            groups.setdefault(find(word), []).append(word)

        def members(word):
            return sorted(groups.get(find(word), [word])) if word in parent else [word]

        # Expand position by position.
        sentences = [""]
        for word in text.split(" "):
            options = members(word)
            sentences = [prefix + " " + option for prefix in sentences for option in options]
        return sorted(s[1:] for s in sentences)
